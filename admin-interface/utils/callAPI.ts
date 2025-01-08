'use client';

import axios from "axios";
import Cookies from 'js-cookie';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
})

export async function postApi(path: string, body = {}, headers = {}): Promise<any> {
	return new Promise(async (resolve, reject) => {
		return instance.post(path, body, {
				headers: {
					...headers,
					Authorization: `Bearer ${Cookies.get('backend_token') ?? ''}`,
				}
			})
			.then(response => resolve(response.data))
			.catch(reject)
	})
}