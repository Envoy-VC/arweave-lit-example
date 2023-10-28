type irysNetworks = 'devnetMatic';

interface ViemConfig {
	url: string;
	token: string;
	rpcUrl: string;
}

type ViemConfigType = Record<irysNetworks, ViemConfig>;

export const ViemConfig: ViemConfigType = {
	devnetMatic: {
		url: 'https://devnet.irys.xyz',
		token: 'matic',
		rpcUrl: 'https://rpc-mumbai.maticvigil.com',
	},
};

export const defaultTags = [
	{
		name: 'App-Name',
		value: 'Encrypted Uploader',
	},
	{
		name: 'App-Version',
		value: '0.0.1',
	},
	{
		name: 'Unix-Time',
		value: Math.round(new Date().getTime() / 1000).toString(),
	},
	{
		name: 'Type',
		value: 'encrypted-image',
	},
];
