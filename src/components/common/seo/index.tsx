import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Encrypted Uploader'
			description='A simple app that uploads encrypted image files to Arweave using Irys and Lit Protocol'
			openGraph={{
				url: 'https://w3-starter.vercel.app',
				title: 'Encrypted Uploader',
				description:
					'A simple app that uploads encrypted image files to Arweave using Irys and Lit Protocol',
				images: [
					{
						url: 'https://i.ibb.co/YhWLyTb/OG.png',
						width: 1200,
						height: 630,
						alt: 'Encrypted Uploader OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Encrypted Uploader',
			}}
			twitter={{
				handle: '@Envoy_1084',
				site: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;
