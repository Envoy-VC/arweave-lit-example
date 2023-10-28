import React from 'react';
import { Input } from 'antd';

// Stores
import { useUploadStore } from '~/stores';

// Types
import type { ConditionType } from '@lit-protocol/types';

const TokenHolders = () => {
	const [contractAddress, setContractAddress] = React.useState<string>('');
	const { setAccessControlConditions } = useUploadStore();

	const onAdd = (contractAddress: string) => {
		setContractAddress(contractAddress);
		if (contractAddress === '') return;
		const conditions = [
			{
				conditionType: 'evmBasic' as ConditionType,
				contractAddress: contractAddress,
				standardContractType: 'ERC721',
				chain: 'ethereum',
				method: 'balanceOf',
				parameters: [':userAddress'],
				returnValueTest: {
					comparator: '>',
					value: '0',
				},
			},
		];

		setAccessControlConditions(conditions);
	};

	return (
		<div className='flex flex-col gap-2 py-4'>
			<Input
				size='middle'
				placeholder='ERC-721 Contract Address'
				className='max-w-sm'
				value={contractAddress}
				onChange={(e) => onAdd(e.target.value)}
			/>
		</div>
	);
};

export default TokenHolders;
