import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_COOL_WALLET,
    headers: {
        // Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    // timeout: 1000,
})

export default (method: string, path: string, body = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
        switch (method.toUpperCase()) {
            case 'POST': {
                return instance
                    .post(process.env.API_COOL_WALLET + path, body, { headers })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((e) => {
                        const { config, response } = e
                        if (response?.data && (response.data.message || response.data.statusmessage)) {
                            reject(response.data.message || response.data.statusmessage)
                        } else {
                            reject(e)
                        }
                    })
            }
            default: {
                return resolve(null)
            }
        }
    })
}
