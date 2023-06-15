import api from './api';

export const createIotEvent = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.post('/iot/addIotEvent', data)
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

export const getIotEvents = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.get('/iot/getIotEvents', {params: data})
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

export const getColdchainEvents = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.get('/iot/getColdchainEvents', {params: data})
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