import api from './api';

export const requestCertificate = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.post('/tasks', data)
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

export const getTasks = (data: any): Promise<any> => {
    
    return new Promise((resolve, reject) => {
        return api.get('/tasks', {params: data})
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

export const getTaskById = (id: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        return api.get('/tasks/' + id)
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

export const updateTask = (id: any, data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        return api.patch('/tasks/' + id, data)
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