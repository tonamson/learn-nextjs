import {create} from 'zustand'

interface CounterState {
	count: number
	increase: () => void
	decrease: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
	count: 0,
	increase: (): void => set((state) => ({count: state.count + 1})),
	decrease: (): void => set((state) => ({count: state.count - 1})),
}))