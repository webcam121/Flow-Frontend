import api from './api';

export const getMe = (): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.get('/users/me')
        .then((res: any) => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res)
            }
        })
        .catch((err: any) => {
            reject(err)
        })
    })
    
}