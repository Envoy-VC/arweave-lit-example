import React from 'react';
import { Image, Upload } from 'antd';

// Stores
import { useUploadStore } from '~/stores';

// Icons
import { TbInbox } from 'react-icons/tb';

// Types
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

const UploadFiles = () => {
	const { image, setImage } = useUploadStore();
	const [b64Image, setB64Image] = React.useState<string>('');

	function convertImageToBase64(file: RcFile) {
		const reader = new FileReader();
		reader.onloadend = () => {
			setB64Image(reader.result as string);
		};
		reader.readAsDataURL(file);
	}
	const props: UploadProps = {
		name: 'file',
		multiple: false,
		fileList: image ? [image] : [],
		accept: 'image/*',
		listType: 'picture-card',
		prefixCls: '!w-full',
		showUploadList: false,
		onRemove: () => {
			setImage(null);
		},
		beforeUpload: (file) => {
			setImage(file);
			convertImageToBase64(file);
			return false;
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	return (
		<div className='flex flex-col gap-4'>
			<Upload.Dragger {...props}>
				<div className='rounded-xl border-2 border-dashed border-gray-300  bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:border-primary'>
					<div className='flex flex-col items-center justify-center gap-3'>
						<TbInbox className='text-4xl text-primary' />
						<p className='text-[1rem]'>Click or drag file to this area to upload</p>
					</div>
				</div>
			</Upload.Dragger>
			{image && (
				<div className='flex w-full flex-row gap-4'>
					<Image
						src={b64Image}
						alt={image.name}
						className='max-h-64 w-full max-w-[14rem] rounded-lg object-cover sm:max-h-36'
					/>
					<div className='flex flex-col text-[1rem] text-slate-700'>
						<div>
							<span className='font-medium'>File Name: </span>
							{image.name}
						</div>
						<div>
							<span className='font-medium'>File Size: </span>
							{(image.size ?? 0) > 1024 * 1024
								? ((image.size ?? 0) / 1024 / 1024).toFixed(2) + 'mb'
								: ((image.size ?? 0) / 1024).toFixed(2) + 'kb'}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadFiles;
