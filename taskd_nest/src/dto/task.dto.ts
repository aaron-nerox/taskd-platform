import {TaskStatus} from "../enums/TaskStatus";
import {IsDateString, IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class TaskDto {

    @IsOptional()
    taskId: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsDateString()
    @IsNotEmpty()
    dueDate: string;

    @IsNotEmpty()
    @IsIn([TaskStatus.Completed, TaskStatus.Pending, TaskStatus.InProgress])
    status: TaskStatus;

    setId(taskId: string) : void {
        this.taskId = taskId;
    }
}
