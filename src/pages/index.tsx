import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';
import Link from 'next/link';

// Hooks
import { useAccount } from 'wagmi';
import { useGetEncryptedFiles } from '~/hooks';

// Components
import { Spin, Button } from 'antd';
import { TransactionPill } from '~/components';

// Icons
import { TbRefresh } from 'react-icons/tb';

const Home: NextPageWithLayout = () => {
	const { address } = useAccount();
	const { data, isLoading, error, next, refetch } = useGetEncryptedFiles();
	if (!address) {
		return (
			<div className='text-semibold text-center text-lg'>Connect Your Wallet</div>
		);
	} else
		return (
			<div className='mx-auto my-24 flex max-w-screen-2xl flex-col gap-8 p-4 sm:p-2'>
				<Link href='/upload' className='flex sm:hidden'>
					<Button type='primary' className='bg-primary'>
						Upload
					</Button>
				</Link>
				<div className='text-3xl font-semibold'>Your Transactions</div>
				{isLoading && data.length === 0 && (
					<div className='flex justify-center'>
						<Spin size='large' />
					</div>
				)}
				{error && (
					<div className='flex flex-row items-center gap-4 border-2'>
						<div className='text-lg font-medium text-red-500'>{error.message}</div>
						<Button
							type='primary'
							className='!flex w-fit !flex-row gap-2 bg-primary'
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={refetch}
						>
							<TbRefresh size={20} className='text-white' />
							<div className='text-white'>Refetch</div>
						</Button>
					</div>
				)}
				<div className='flex flex-row flex-wrap gap-4'>
					{data?.map((item, index) => <TransactionPill key={index} data={item} />)}
				</div>
			</div>
		);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
