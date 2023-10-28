import React from 'react';
import type { TransactionNode } from '~/hooks/get-encrypted-files';
import { Image, Skeleton, Button } from 'antd';

interface Props {
	data: TransactionNode;
}

const TransactionPill = ({ data }: Props) => {
	const {
		node: { id, size, tags, timestamp },
	} = data;

	const fileName = tags.find((value) => value.name === 'Title');
	const description = tags.find((value) => value.name === 'Description');

	return (
		<div className='flex flex-col gap-2 boxShadow rounded-md p-4'>
			<Skeleton.Image className='!h-96 !w-full' />
			<div className='flex flex-col text-sm'>
				<div className='flex flex-row gap-2'>
					<span className='font-semibold'>Id:</span>
					<span>{id}</span>
				</div>
				<div className='flex flex-row gap-2'>
					<span className='font-semibold'>File Name:</span>
					<span>{fileName?.value}</span>
				</div>
				<div className='flex flex-row gap-2'>
					<span className='font-semibold'>File Size:</span>
					<span>
						{(Number(size) ?? 0) > 1024 * 1024
							? ((Number(size) ?? 0) / 1024 / 1024).toFixed(2) + 'mb'
							: ((Number(size) ?? 0) / 1024).toFixed(2) + 'kb'}
					</span>
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Description:</span>
					<p>{description?.value}</p>
				</div>
				<div className='flex flex-row gap-2'>
					<span className='font-semibold'>Uploaded at:</span>
					<p>{new Date(timestamp).toUTCString()}</p>
				</div>
			</div>
			<Button className='bg-primary' type='primary'>Decrypt</Button>
		</div>
	);
};

export default TransactionPill;
