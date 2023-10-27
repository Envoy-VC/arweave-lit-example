import React from 'react';
import { Tabs } from 'antd';
import type { TabPaneProps } from 'antd';

import EVMAccounts from '../evm-accounts';

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
		children: 'Token Holders',
	},
	{
		label: 'Custom Conditions',
		key: 'custom',
		children: 'Custom Conditions',
	},
];

const ControlTabs = () => {
	return (
		<Tabs
			defaultActiveKey='evm-accounts'
			type='card'
			size='large'
			items={items}
		/>
	);
};

export default ControlTabs;
