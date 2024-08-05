import {TaskStatus} from "../enums/TaskStatus";
import {IsDateString, IsIn, IsNotEmpty, IsOptional} from "class-validator";

/**
 * Task data transfer object
 * This is a model used in some crud requests for Tasks
 * It uses class-validator to do input validation before the endpoint operation happens
 */
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
