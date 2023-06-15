import api from './api';

export const submitSealdoc = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.post('/sealdoc', data)
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

export const getSealdoc = (): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.get('/sealdoc')
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