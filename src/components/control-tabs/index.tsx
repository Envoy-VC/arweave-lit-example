import React from 'react';

// Stores
import { useUploadStore } from '~/stores';

// Components
import { Tabs } from 'antd';
import EVMAccounts from '../evm-accounts';
import TokenHolders from '../token-holders';
import CustomConditions from '../custom-conditions';

// Types
import type { TabPaneProps } from 'antd';

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
		label: 'ERC-721 Holder',
		key: 'erc721-holder',
		children: <TokenHolders />,
	},
	{
		label: 'Custom Conditions',
		key: 'custom',
		children: <CustomConditions />,
	},
];

const ControlTabs = () => {
	const { setAccessControlConditions, setType } = useUploadStore();
	return (
		<Tabs
			onChange={(activeKey) => {
				setType(activeKey);
				setAccessControlConditions([]);
			}}
			defaultActiveKey='evm-accounts'
			type='card'
			size='large'
			items={items}
		/>
	);
};

export default ControlTabs;
