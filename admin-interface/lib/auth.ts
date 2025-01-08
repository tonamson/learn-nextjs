import {postApi} from "@/utils/callAPI";

export function doLogin(username: string, password: string) {
	return new Promise(async (resolve, reject) => {
		return postApi('/auth/login-admin', {username, password}).then(resolve).catch(reject)
	})
}