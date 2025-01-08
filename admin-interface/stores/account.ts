import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Cookies from 'js-cookie';

interface AdminInfo {
	id: string,
	username: string,
	ability: string[],
	token: string,
}

interface AccountState {
	account: AdminInfo,
	setAccount: (account: AdminInfo) => void,
	resetAccount: () => void,
}

const initialState: AdminInfo = {
	id: '',
	username: '',
	ability: [],
	token: '',
}

export const useAccountStore = create<AccountState>()(
	persist(
		(set) => ({
			account: initialState,
			setAccount: (account: AdminInfo) => set({ account }),
			resetAccount: () => {
				sessionStorage.removeItem('account-storage')
				Cookies.set('backend_token', '')
				set({ account: initialState })
			},
		}),
		{
			name: 'account-storage',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)