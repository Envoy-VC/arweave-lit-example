import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { UploadFiles, ControlTabs } from '~/components';
import { Button } from 'antd';

import { useLit } from '~/hooks';
import { useUploadStore } from '~/stores';
import type { RcFile } from 'antd/es/upload';

const Upload: NextPageWithLayout = () => {
	const { encryptFile } = useLit();
	const { image, accessControlConditions } = useUploadStore();
	return (
		<div className='boxShadow m-2 my-24 flex max-w-screen-lg flex-col gap-4 p-4 rounded-xl sm:mx-auto'>
			<div className='flex flex-col gap-4'>
				<div className='text-2xl font-semibold'>Upload Image</div>
				<UploadFiles />
			</div>
			<div className='flex flex-col gap-4'>
				<div className='text-2xl font-semibold'>Access Control Conditions</div>
				<ControlTabs />
				<Button
					className='bg-primary'
					type='primary'
					size='large'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={async () => {
						if (!image || !accessControlConditions) return;
						const params = {
							file: image as RcFile,
							conditions: accessControlConditions,
						};
						console.log(params);
						await encryptFile(params)
							.then((res) => console.log(res))
							.catch((err) => console.log(err));
					}}
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
