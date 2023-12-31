import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';
import { useSearchParams } from 'next/navigation';

import { useRouter } from 'next/router';

// Stores
import { useUploadStore } from '~/stores';

// Hooks
import { useLit, useIrys } from '~/hooks';

// Components
import { Button, Input, message } from 'antd';
import { UploadFiles, ControlTabs } from '~/components';
import { SuccessStep } from '~/components/screens';

// Types
import type { RcFile } from 'antd/es/upload';

const Upload: NextPageWithLayout = () => {
	const searchParams = useSearchParams();
	const hasSuccessParam = searchParams.has('success');
	const success = searchParams.get('success');

	const { encryptFile } = useLit();
	const { uploadFile } = useIrys();
	const router = useRouter();
	const { image, accessControlConditions, setReadme, readme, setTxId, reset } =
		useUploadStore();

	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	const onClick = async () => {
		if (!image || !accessControlConditions) {
			await message.error(
				'Please upload an image and set access control conditions'
			);
			return;
		}
		try {
			setIsUploading(true);
			const res = await encryptFile({
				file: image as RcFile,
				conditions: accessControlConditions,
				readme,
			});
			if (!res) throw new Error('Error encrypting file');
			const { encryptedFile } = res;
			const txId = await uploadFile({ encryptedFile, readme });
			if (!txId) throw new Error('Error uploading file');
			router
				.push('/upload?success=true')
				.then(() => reset())
				.then(() => setTxId(txId))
				.catch((err) => console.log(err));
			console.log(txId);
		} catch (error) {
			console.log(error);
		} finally {
			setIsUploading(false);
		}
	};

	if (hasSuccessParam && success === 'true') {
		return (
			<div className='m-2 my-24 flex max-w-screen-lg flex-col gap-4 p-4 sm:mx-auto'>
				<SuccessStep />
			</div>
		);
	} else
		return (
			<div className='boxShadow m-2 my-24 flex max-w-screen-lg flex-col gap-4 rounded-xl p-4 sm:mx-auto'>
				<div className='flex flex-col gap-4'>
					<div className='text-2xl font-semibold'>Upload Image</div>
					<UploadFiles />
				</div>
				<div className='flex flex-col gap-4'>
					<div className='text-2xl font-semibold'>Access Control Conditions</div>
					<ControlTabs />
					<Input.TextArea
						placeholder='Readme for Users'
						rows={6}
						onChange={(e) => setReadme(e.target.value)}
					/>
					<Button
						className='bg-primary'
						type='primary'
						size='large'
						disabled={isUploading}
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onClick={onClick}
					>
						Upload
					</Button>
				</div>
			</div>
		);
};

Upload.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Upload;
