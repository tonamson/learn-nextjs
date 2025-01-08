'use client';

import {useCounterStore} from "@/stores/counter";

export default function ManipulateNumberZustand() {
	
	const {count, increase, decrease} = useCounterStore();
	return (
		<>
			<button title={'Increase'} onClick={() => increase()}>increase</button>
			<button title={'Decrease'} onClick={() => decrease()}>decrease</button>
		</>
	)
}