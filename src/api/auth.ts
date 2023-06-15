import axios from 'axios'
import api from './api'
import { LoginData } from '../views/pages/auth/sign-in'
import { SignupData } from '../views/pages/auth/sign-up'
import { config } from '../config';
import { VerifyData } from '../views/pages/auth/verify';

export const signIn = (data: LoginData): any => {
    return new Promise((resolve, reject) => {
        return axios.get(config.API_BASE_URL + '/auth/login', {headers: {"Authorization" : `Basic ${window.btoa(`${data.email}:${data.password}`)}`}})
                .then(res => {
                    if (res.status === 200) {
                        let user = { ...res.data, email: data.email };
                        resolve(user);
                    } else {
                        reject("login failed");
                    }
                }).catch(err => {
                    reject(err);
                });
    })
}

export const signUp = (data: SignupData): any => {
    return new Promise((resolve, reject) => {
        return axios.post(config.API_BASE_URL + '/auth/register', { ...data })
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

export const verifyEmail = (data: VerifyData): any => {
    return new Promise((resolve, reject) => {
        return axios.post(config.API_BASE_URL + '/auth/verify', { ...data })
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

