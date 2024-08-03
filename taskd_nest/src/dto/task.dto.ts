import {TaskStatus} from "../enums/TaskStatus";

export class TaskDto {
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}