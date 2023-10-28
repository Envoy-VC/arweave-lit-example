import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { checkAndSignAuthMessage } from '@lit-protocol/lit-node-client';
import { uint8arrayToString } from '@lit-protocol/lit-node-client';
import { useLitStore } from '~/stores';
import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

interface EncryptFileParams {
	file: File;
	conditions: UnifiedAccessControlConditions;
	readme?: string;
}

interface DecryptFileParams {
	file: File | Blob;
	conditions: UnifiedAccessControlConditions;
}

const useLit = () => {
	const { litClient, authSig, setClient, setAuthSig } = useLitStore();

	const connect = async () => {
		try {
			const client = new LitJsSdk.LitNodeClient({
				litNetwork: 'cayenne',
			});
			await client.connect();
			setClient(client);
			return client;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const signAuth = async () => {
		try {
			const authSig = await checkAndSignAuthMessage({
				chain: 'ethereum',
			});
			setAuthSig(authSig);
			return authSig;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const connectAndSign = async () => {
		try {
			const client = await connect();
			const authSig = await signAuth();
			if (!client) return null;
			if (!authSig) return null;
			return { client, authSig };
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const encryptFile = async ({
		file,
		conditions,
		readme = '',
	}: EncryptFileParams) => {
		const res = await connectAndSign();
		if (!res) return;
		const { client, authSig } = res;
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unsafe-assignment
			const res = await LitJsSdk.encryptFileAndZipWithMetadata({
				unifiedAccessControlConditions: conditions,
				authSig,
				chain: 'ethereum',
				file,
				litNodeClient: client,
				readme,
			});
			const encryptedFile: File = new File([res as Blob], file.name);
			return { encryptedFile, readme };
		} catch (error) {
			console.log(error);
		}
	};

	const decryptFile = async ({ file }: DecryptFileParams) => {
		const res = await connectAndSign();
		if (!res) return;
		const { client, authSig } = res;
		try {
			const res = await LitJsSdk.decryptZipFileWithMetadata({
				authSig,
				litNodeClient: client,
				file,
			});
			if (!res) {
				throw new Error(`Could not decrypt File`);
			}
			console.log(res);
			const { decryptedFile, metadata } = res;
			return { decryptedFile, metadata };
		} catch (error) {
			console.log(error);
		}
	};

	return { connect, signAuth, encryptFile, decryptFile, connectAndSign };
};

export default useLit;
