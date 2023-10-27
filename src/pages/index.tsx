import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	return <div className='mx-auto my-24 max-w-screen-lg border-2 p-2'>Home</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
