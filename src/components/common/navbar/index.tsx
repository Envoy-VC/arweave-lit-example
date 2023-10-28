import React from 'react';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Icons
import { TbLockCode } from 'react-icons/tb';
import { Button } from 'antd';
import Link from 'next/link';

const Navbar = () => {
	const { connect, connectors } = useConnect();
	const { address } = useAccount();
	const onClick = () => {
		const metamask = connectors.find(
			(connector) => connector instanceof MetaMaskConnector
		);
		if (metamask) {
			connect({ connector: metamask });
		}
	};

	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<Link className='flex flex-row items-center gap-2' href='/'>
					<TbLockCode className='text-4xl text-primary' />
					<div className='hidden text-2xl font-bold sm:flex'>Encrypted Uploader</div>
				</Link>
				<div className='flex flex-row items-center gap-3'>
					<Link href='/upload' className='hidden sm:flex'>
						<Button type='primary' className='bg-primary'>
							Upload
						</Button>
					</Link>
					{!address ? (
						<Button className='bg-primary' type='primary' onClick={onClick}>
							Connect
						</Button>
					) : (
						<div className='flex flex-row items-center gap-2'>
							<span>Connected to:</span>
							<span className='text-sm font-semibold text-primary'>
								{address.slice(0, 6) + '...' + address.slice(-6)}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
