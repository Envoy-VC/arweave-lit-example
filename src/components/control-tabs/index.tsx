import React from 'react';
import { Tabs } from 'antd';
import type { TabPaneProps } from 'antd';
import { useUploadStore } from '~/stores';
import EVMAccounts from '../evm-accounts';
import TokenHolders from '../token-holders';
import CustomConditions from '../custom-conditions';

export interface Tab extends Omit<TabPaneProps, 'tab'> {
	key: string;
	label: React.ReactNode;
}

const items: Tab[] = [
	{
		label: 'Specific EVM Accounts',
		key: 'evm-accounts',
		children: <EVMAccounts />,
	},
	{
		label: 'Token Holders',
		key: 'token-holders',
		children: <TokenHolders />,
	},
	{
		label: 'Custom Conditions',
		key: 'custom',
		children: <CustomConditions />,
	},
];

const ControlTabs = () => {
	const { setAccessControlConditions } = useUploadStore();
	return (
		<Tabs
			onChange={() => setAccessControlConditions([])}
			defaultActiveKey='evm-accounts'
			type='card'
			size='large'
			items={items}
		/>
	);
};

export default ControlTabs;
