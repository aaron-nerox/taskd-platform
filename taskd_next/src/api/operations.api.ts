import axios from 'axios';
import {TaskDto} from "@/dto/task.dto";
import {TaskStatus} from "@/enums/TaskStatus";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function createNewTask(
    title: string,
    description: string,
    date: string
): Promise<TaskDto | undefined> {

    try {
        const result = await axios.post(
            'http://localhost:8000/tasks',
            {
                title: title,
                description: description,
                dueDate: date,
                status: TaskStatus.Pending
            },
            {
                withCredentials: true
            }
        )

        if(!result || result.status != 201) {
            return Promise.reject(result.data)
        }

        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}

export async function updateTask(
    taskId: string,
    title: string,
    description: string,
    date: string,
    status: string,
    router: AppRouterInstance
): Promise<TaskDto | undefined> {

    console.log(status)
    try {
        const result = await axios.put(
            `http://localhost:8000/tasks/${taskId}`,
            {
                title: title,
                description: description,
                dueDate: date,
                status: status
            },
            {
                withCredentials: true
            }
        )

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }

        router.refresh()
        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}

export async function deleteTask(
    taskId: string,
    router: AppRouterInstance
): Promise<TaskDto | undefined> {

    try {
        const result = await axios.delete(
            `http://localhost:8000/tasks/${taskId}`,
            {
                withCredentials: true
            }
        )

        if(!result || result.status != 200) {
            return Promise.reject(result.data)
        }

        router.refresh()
        return result.data
    } catch(error) {
        return Promise.reject(error);
    }
}