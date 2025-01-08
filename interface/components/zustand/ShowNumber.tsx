'use client';

import {useCounterStore} from "@/stores/counter";

export default function ShowNumberZustand() {
	const {count} = useCounterStore();
	return (
		<>
			<div>Other component count: {count}</div>
		</>
	)
}