import { create } from 'zustand';
import { UploadFile } from 'antd';

import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

interface State {
	image: UploadFile | null;
	accessControlConditions: UnifiedAccessControlConditions;
}

interface Actions {
	setImage: (image: UploadFile | null) => void;
	setAccessControlConditions: (
		accessControlConditions: UnifiedAccessControlConditions
	) => void;
}

export const useUploadStore = create<State & Actions>()((set) => ({
	image: null,
	accessControlConditions: [],
	setImage: (image: UploadFile | null) => set({ image }),
	setAccessControlConditions: (
		accessControlConditions: UnifiedAccessControlConditions
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	) => set({ accessControlConditions: accessControlConditions }),
}));
