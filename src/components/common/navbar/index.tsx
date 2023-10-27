import React from 'react';

// Icons
import { TbLockCode } from 'react-icons/tb';

const Navbar = () => {
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<TbLockCode className='text-4xl text-primary' />
					<div className='hidden text-2xl font-bold sm:flex'>Encrypted Uploader</div>
				</div>
				<div className='flex flex-row items-center gap-2'></div>
			</div>
		</div>
	);
};

export default Navbar;
