import React from 'react';
import { Button, Input } from 'antd';
import type {
	UnifiedAccessControlConditions,
	AccsRegularParams,
} from '@lit-protocol/types';
import { useUploadStore } from '~/stores';

import { TbTrashFilled } from 'react-icons/tb';

const EVMAccounts = () => {
	const { accessControlConditions, setAccessControlConditions } =
		useUploadStore();
	const [address, setAddress] = React.useState<string>('');

	const onAdd = () => {
		if (address === '') return;
		try {
			const condition = {
				contractAddress: '',
				standardContractType: '',
				chain: 'ethereum',
				method: '',
				parameters: [':userAddress'],
				returnValueTest: {
					comparator: '=',
					value: address,
				},
			};
			if (accessControlConditions.length % 2 === 0) {
				const newConditions = [condition];
				setAccessControlConditions(newConditions);
			} else {
				const newConditions = [
					...accessControlConditions,
					{ operator: 'or' },
					condition,
				];
				setAccessControlConditions(newConditions);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAddress('');
		}
	};

	const onDelete = (conditions: UnifiedAccessControlConditions) => {
		const [condition] = conditions;
		if (!condition) return;
		try {
			const index = accessControlConditions.indexOf(condition);

			if (accessControlConditions.length === 1) {
				setAccessControlConditions([]);
			} else {
				if (index === 0) {
					const newConditions = [...accessControlConditions.slice(2)];
					console.log(newConditions);
					setAccessControlConditions(newConditions);
				} else {
					const newConditions = [
						...accessControlConditions.slice(0, index - 1),
						...accessControlConditions.slice(index + 1),
					];
					console.log(newConditions);
					setAccessControlConditions(newConditions);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col gap-2 py-4'>
			<div className='flex flex-row gap-3'>
				<Input
					size='middle'
					placeholder='EVM Account Address'
					className='max-w-sm'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Button size='middle' type='primary' className='bg-primary' onClick={onAdd}>
					Add
				</Button>
			</div>
			<div className='flex flex-col'>
				{accessControlConditions
					.filter((value, index) => index % 2 === 0)
					.map((value, index) => {
						const {
							returnValueTest: { value: address },
						} = value as AccsRegularParams;
						return (
							<div key={index} className='max-w-xl border-b-[1px] border-gray-300 p-1'>
								<div className='flex flex-row items-center justify-between'>
									<div className='hidden text-sm font-medium text-slate-700 sm:flex'>
										{address}
									</div>
									<div className='flex text-sm font-medium text-slate-700 sm:hidden'>
										{address.slice(0, 6) + '...' + address.slice(-6)}
									</div>
									<Button
										type='text'
										icon={<TbTrashFilled size={16} className='text-red-500' />}
										onClick={() => onDelete([value])}
									/>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default EVMAccounts;
