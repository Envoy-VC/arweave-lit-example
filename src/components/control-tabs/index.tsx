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
