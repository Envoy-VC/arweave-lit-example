import React from 'react';
import { Image, message, Upload } from 'antd';

// Icons
import { TbInbox } from 'react-icons/tb';

// Types
import type { UploadProps, UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload';

const UploadFiles = () => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
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
		fileList,
		accept: 'image/*',
		listType: 'picture-card',
		prefixCls: '!w-full',
		showUploadList: false,
		onRemove: () => {
			setFileList([]);
		},
		beforeUpload: (file) => {
			setFileList([file]);
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
				<div className='rounded-xl border-2 border-dashed border-gray-300  bg-gray-50 p-4 transition-all duration-300 ease-in-out hover:border-blue-500'>
					<div className='flex flex-col items-center justify-center gap-3'>
						<TbInbox className='text-4xl text-blue-600' />
						<p className='text-[1rem]'>Click or drag file to this area to upload</p>
					</div>
				</div>
			</Upload.Dragger>
			{fileList.at(0) && (
				<div className='flex w-full flex-row gap-4'>
					<Image
						src={b64Image}
						alt={fileList.at(0)?.fileName}
						className='max-h-64 sm:max-h-36 w-full max-w-[14rem] rounded-lg object-cover'
					/>
					<div className='flex flex-col text-[1rem] text-slate-700'>
						<div>
							<span className='font-medium'>File Name: </span>
							{fileList.at(0)?.name}
						</div>
						<div>
							<span className='font-medium'>File Size: </span>
							{(fileList.at(0)?.size ?? 0) > 1024 * 1024
								? ((fileList?.at(0)?.size ?? 0) / 1024 / 1024).toFixed(2) + 'mb'
								: ((fileList?.at(0)?.size ?? 0) / 1024).toFixed(2) + 'kb'}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadFiles;
