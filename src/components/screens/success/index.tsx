import React from 'react';
import Confetti from 'react-confetti';

import { useRouter } from 'next/router';

import { Button, Result } from 'antd';

import { useUploadStore } from '~/stores';

const SuccessStep = () => {
	const router = useRouter();
	const { txId } = useUploadStore();
	const [isExploding, setIsExploding] = React.useState<boolean>(false);

	React.useEffect(() => {
		setIsExploding(true);
		setTimeout(() => {
			setIsExploding(false);
		}, 5000);
	}, [txId]);

	const onClick = (href: string) => {
		router.push(href).catch((error) => {
			console.log(error);
		});
	};

	return (
		<div className='mx-auto w-fit'>
			<Result
				status='success'
				title='Successfully Uploaded Encrypted File'
				subTitle={`Arweave Transaction Id: ${txId}`}
				extra={[
					<Button
						key='home'
						type='primary'
						className='bg-primary'
						onClick={() => onClick('/')}
					>
						Go Home
					</Button>,
				]}
			/>
			<Confetti recycle={isExploding} numberOfPieces={100} className='absolute' />
		</div>
	);
};

export default SuccessStep;
