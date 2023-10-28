import React from 'react';
import type { TransactionNode } from '~/hooks/get-encrypted-files';
import { Image, Skeleton, Button } from 'antd';

import { useLit } from '~/hooks';

interface Props {
	data: TransactionNode;
}

const TransactionPill = ({ data }: Props) => {
	const { decryptFile } = useLit();
	const {
		node: { id, size, tags, timestamp },
	} = data;

	const fileName = tags.find((value) => value.name === 'Title');
	const description = tags.find((value) => value.name === 'Description');

	const [decryptedFile, setDecryptedFile] = React.useState<File | null>(null);

	const onDecrypt = async () => {
		try {
			const res = await fetch(`https://arweave.net/${id}`);
			const blob = await res.blob();
			const result = await decryptFile({
				file: new File([blob], fileName?.value ?? ''),
			});
			if (!result) throw new Error('Decryption failed');
			const decryptedFile = new File(
				[new Blob([result.decryptedFile])],
				fileName?.value ?? ''
			);
			setDecryptedFile(decryptedFile);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='boxShadow flex flex-col gap-2 rounded-md p-4'>
			{decryptedFile ? (
				<Image
					src={URL.createObjectURL(decryptedFile)}
					alt={fileName?.value}
					className='mx-auto !h-96 !w-full max-w-full sm:max-w-lg'
				/>
			) : (
				<Skeleton.Image className='mx-auto !h-96 !w-full max-w-full sm:max-w-lg' />
			)}
			<div className='flex flex-col break-all text-sm'>
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
			<Button
				className='bg-primary'
				type='primary'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={onDecrypt}
			>
				Decrypt
			</Button>
		</div>
	);
};

export default TransactionPill;
