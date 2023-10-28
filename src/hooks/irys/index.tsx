/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebIrys } from '@irys/sdk';
import useLit from '../lit';
import { useUploadStore } from '~/stores';
import { polygonMumbai } from 'viem/chains';
import { ViemConfig, defaultTags } from '~/helpers';
import { custom, parseEther, createWalletClient } from 'viem';

interface UploadFileParams {
	encryptedFile: File;
	readme?: string;
}

const useIrys = () => {
	const { encryptFile } = useLit();
	const { image } = useUploadStore();
	const getWebIrys = async (): Promise<WebIrys> => {
		const { url, token } = ViemConfig.devnetMatic;
		const client = createWalletClient({
			chain: polygonMumbai,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			transport: custom(window.ethereum),
		});
		if (client.chain.id !== polygonMumbai.id) {
			await client.switchChain({ id: polygonMumbai.id });
		}

		console.log('client=', client);
		//@ts-expect-error injected
		client.getSigner = () => client;
		//@ts-expect-error injected
		client.getAddress = async () => client.getAddresses().then((a) => a[0]);

		const wallet = { name: 'viem', provider: client };
		const webIrys = new WebIrys({ url, token, wallet });

		// @ts-expect-error viem
		webIrys.tokenConfig.getFee = async (_amount, _to): Promise<number> => {
			return Promise.resolve(0);
		};

		webIrys.tokenConfig.sendTx = async (data: any): Promise<string> => {
			const hash = await client.sendTransaction({
				to: data.to,
				value: parseEther(data.amount.toString()),
				account: webIrys.address as `0x${string}`,
			});
			return hash;
		};

		webIrys.tokenConfig.createTx = async (
			amount,
			to,
			fee
		): Promise<{ txId: string | undefined; tx: any }> => {
			// dummy value/method
			return Promise.resolve({ txId: undefined, tx: { amount, to, fee } });
		};
		await webIrys.ready();

		//@ts-expect-error injected
		client._signTypedData = async (domain, types, message) => {
			message['Transaction hash'] =
				'0x' + Buffer.from(message['Transaction hash']).toString('hex');
			return await client.signTypedData({
				domain,
				message,
				types,
				account: webIrys.address! as `0x${string}`,
				primaryType: 'Bundlr',
			});
		};

		console.log(`Conected to webIrys from ${webIrys.address}`);
		return webIrys;
	};

	const fundIfNeeded = async (file: File) => {
		const webIrys = await getWebIrys();
		const balance = await webIrys.getLoadedBalance();
		const price = await webIrys.getPrice(file.size);
		if (price > balance) {
			const fundTx = await webIrys.fund(
				webIrys.utils.toAtomic(price.minus(balance))
			);
		}
	};

	const uploadFile = async ({
		encryptedFile,
		readme = '',
	}: UploadFileParams) => {
		const webIrys = await getWebIrys();
		const tags = [
			...defaultTags,
			{ name: 'Title', value: encryptedFile?.name ?? '' },
			{ name: 'Description', value: readme },
			{ name: 'Content-Type', value: encryptedFile?.type ?? '' },
		];
		try {
			await fundIfNeeded(encryptedFile);
			const receipt = await webIrys.uploadFile(encryptedFile, { tags });
			console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
			return receipt.id;
		} catch (e) {
			console.log('Error uploading file ', e);
		}
	};

	return { getWebIrys, uploadFile };
};

export default useIrys;
