import React from 'react';
import { ConfigProvider, theme } from 'antd';

interface Props {
	children: React.ReactNode;
}

const AntDesignConfigProvider = ({ children }: Props) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
				token: {
					colorPrimary: '#923eff',
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default AntDesignConfigProvider;
