import axios from 'axios';

export default async function login(email: string, password: string): Promise<{username: string, email: string, userId: string, userToken: string} | undefined> {
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
                }
            }
        )

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }

        return result.data
    } catch(error) {
        return Promise.reject(error);
    }



}