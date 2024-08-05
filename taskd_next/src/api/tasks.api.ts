import axios from 'axios';

export default async function getTasks() {
    try {
        const result = await axios.get(
            'http://localhost:8000/tasks', {
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