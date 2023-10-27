import { create } from 'zustand';
import type { UploadFile } from 'antd';

import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

interface State {
	type: string;
	image: UploadFile | null;
	accessControlConditions: UnifiedAccessControlConditions;
}

interface Actions {
	setType: (type: string) => void;
	setImage: (image: UploadFile | null) => void;
	setAccessControlConditions: (
		accessControlConditions: UnifiedAccessControlConditions
	) => void;
}

export const useUploadStore = create<State & Actions>()((set) => ({
	type: 'evm-accounts',
	image: null,
	accessControlConditions: [],
	setImage: (image: UploadFile | null) => set({ image }),
	setAccessControlConditions: (
		accessControlConditions: UnifiedAccessControlConditions
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	) => set({ accessControlConditions: accessControlConditions }),
	setType: (type: string) => set({ type }),
}));
