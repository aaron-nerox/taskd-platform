import axios from 'axios';
import {TaskDto} from "@/dto/task.dto";
import {TaskStatus} from "@/enums/TaskStatus";

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