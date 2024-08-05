import axios from 'axios';
import {cookies} from "next/headers";
import {SummaryDto} from "@/dto/summary.dto";
import {TaskDto} from "@/dto/task.dto";

export async function getTasks(): Promise<TaskDto[] | undefined> {
    const cookie = cookies().get('user_token')?.value

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

        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}

export async function getTaskSummary() : Promise<SummaryDto | undefined> {

    const cookie = cookies().get('user_token')?.value

    try {
        const result = await axios(
            'http://localhost:8000/tasks/summary',
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

        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}