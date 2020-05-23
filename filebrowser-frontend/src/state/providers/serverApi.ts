import axios, { AxiosRequestConfig } from 'axios';

export function serverApi<T>(
	method: 'get' | 'post',
	path: string,
	data?: any
): Promise<T | T[] | null> {
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            data: data ? JSON.stringify(data) : null,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: method,
            url: 'http://localhost:3101' + path,
        }
        axios(config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function apiDownloadFile<T>(
    path: string,
	data?: any
): Promise<T | T[] | null>{
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            data: data ? JSON.stringify(data) : null,
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob',
            method: 'post',
            url: 'http://localhost:3101' + path,
        }
        axios(config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    })
}