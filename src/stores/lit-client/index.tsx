import { create } from 'zustand';

import type * as LitJsSdk from '@lit-protocol/lit-node-client';

import type { AuthSig } from '@lit-protocol/types';

interface State {
	litClient: LitJsSdk.LitNodeClient | null;
	authSig: AuthSig | null;
}

interface Actions {
	setClient: (client: LitJsSdk.LitNodeClient) => void;
	setAuthSig: (sig: AuthSig) => void;
}

export const useLitStore = create<State & Actions>()((set) => ({
	litClient: null,
	authSig: null,
	setAuthSig: (authSig: AuthSig) => set({ authSig }),
	setClient: (client: LitJsSdk.LitNodeClient) => set({ litClient: client }),
}));
