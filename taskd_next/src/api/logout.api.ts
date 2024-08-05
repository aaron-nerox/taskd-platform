import axios from 'axios';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function logout(router: AppRouterInstance) {

    try {
        const result = await axios.post(
            'http://localhost:8000/auth/logout',
            {},
            {
                headers : {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        )

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }

        router.replace('/')

        return Promise.resolve()
    } catch(error) {
        return Promise.reject(error);
    }
}