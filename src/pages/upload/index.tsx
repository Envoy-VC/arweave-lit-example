import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { UploadFiles, ControlTabs } from '~/components';

const Upload: NextPageWithLayout = () => {
	return (
		<div className='mx-auto my-24 flex max-w-screen-lg flex-col gap-4 border-2 p-2'>
			<div className='flex flex-col gap-4'>
				<div className='text-2xl font-semibold'>Upload Image</div>
				<UploadFiles />
			</div>
			<div className='flex flex-col gap-4'>
				<div className='text-2xl font-semibold'>Access Control Conditions</div>
				<ControlTabs />
			</div>
		</div>
	);
};

Upload.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Upload;
