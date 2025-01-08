import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.API_CRM,
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
            case 'GET': {
                return instance
                    .get(process.env.API_CRM + path, {
                        params: body,
                        headers,
                    })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((e) => reject(e))
            }
            case 'POST': {
                return instance
                    .post(process.env.API_CRM + path, body, { headers })
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
            case 'PUT': {
                return instance
                    .put(process.env.API_CRM + path, body, {
                        params: body,
                        headers,
                    })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((e) => reject(e))
            }
            case 'DELETE': {
                return instance
                    .delete(process.env.API_CRM + path, { headers })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((e) => reject(e))
            }
            default: {
            }
        }
    })
}
