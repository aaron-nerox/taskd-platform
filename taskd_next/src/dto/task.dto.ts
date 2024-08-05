import {TaskStatus} from "@/enums/TaskStatus";

export class TaskDto {
    constructor(
        taskId: string,
        title: string,
        description: string,
        dueDate: string,
        status: TaskStatus,
    ) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }

    taskId: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}