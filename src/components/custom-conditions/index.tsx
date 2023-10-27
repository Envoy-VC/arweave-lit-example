import React from 'react';
import { Input, Button } from 'antd';
import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

import { useUploadStore } from '~/stores';

const CustomConditions = () => {
	const [condition, setCondition] = React.useState<string>('');
	const { setAccessControlConditions, accessControlConditions } =
		useUploadStore();

	const onSave = () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const parsedCondition = JSON.parse(JSON.stringify(condition));
			setAccessControlConditions(
				parsedCondition as UnifiedAccessControlConditions
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col gap-2 py-4'>
			<Input.TextArea
				size='middle'
				placeholder='Custom Access Control Conditions'
				className='max-w-sm'
				value={condition}
				rows={10}
				onChange={(e) => setCondition(e.target.value)}
			/>
			<div className='flex justify-end'>
				<Button
					className='w-fit bg-primary'
					type='primary'
					onClick={onSave}
					disabled={
						JSON.parse(JSON.stringify(condition)) === accessControlConditions
					}
				>
					{JSON.parse(JSON.stringify(condition)) === accessControlConditions
						? 'Saved'
						: 'Save'}
				</Button>
			</div>
		</div>
	);
};

export default CustomConditions;
