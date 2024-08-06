import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {TaskStatus} from "../enums/TaskStatus";
import {HydratedDocument} from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

/**
 * Mongoose model for Task
 */
@Schema()
export class Task {

    @Prop({
        required: true,
        type: String,
        unique: true
    })
    taskId: string

    @Prop({
        required: true,
        type: String
    })
    taskUserId: string;

    @Prop({
        required: true,
        type: String
    })
    title: string;

    @Prop({
        required: true,
        type: String
    })
    description: string;

    @Prop({
        required: true,
        type: String
    })
    dueDate: string;

    @Prop({
        required: true,
        enum: TaskStatus,
        default: TaskStatus.Pending
    })
    status: TaskStatus;
}

/**
 * Mongoose schema to be used inside modules
 */
export const TaskSchema = SchemaFactory.createForClass(Task)