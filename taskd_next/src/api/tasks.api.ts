import axios from 'axios';
import {cookies} from "next/headers";

export async function getTasks(): Promise<any[]> {
    const cookie = cookies().get('user_token')?.value
    console.log(cookie)

    axios.defaults.withCredentials = true
    try {
        const result = await axios(
            'http://localhost:8000/tasks',
            {
                headers : {
                    'Content-Type': 'application/json',
                    'Cookie' : `user_token=${cookie}`
                },
                method: 'GET',
                withCredentials: true
            }
        )

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }

        console.log(result.data)

        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}