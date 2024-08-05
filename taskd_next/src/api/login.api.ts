'use server'
import axios from 'axios';
import {cookies} from "next/headers";

export async function login(email: string, password: string): Promise<{username: string, email: string, userId: string, userToken: string} | undefined> {
    try {
        const result = await axios.post(
            'http://localhost:8000/auth/login',
            {
                email: email,
                password: password
            },
            {
                headers : {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )

        cookies().set('user_token', result.data.userToken);

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }


        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}

export async function register(username: string, email: string, password: string): Promise<{username: string, email: string, userId: string, userToken: string} | undefined> {
    try {
        const result = await axios.post(
            'http://localhost:8000/auth/register',
            {
                username: username,
                email: email,
                password: password
            },
            {
                headers : {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )

        cookies().set('user_token', result.data.userToken);

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }


        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}

