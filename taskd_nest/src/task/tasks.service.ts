import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "../schemas/task.schema";
import {Model} from "mongoose";
import {TaskDto} from "../dto/task.dto";
import {TaskSummaryDto} from "../dto/taskSummary.dto";
import {TaskStatus} from "../enums/TaskStatus";
import {v4 as uuid4} from "uuid";


@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    async createTask(task: TaskDto) : Promise<Task> {
        task.setId(uuid4())
        const createdTask = new this.taskModel(task)
        return createdTask.save()
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskModel.find();
    }

    async getTaskById(id: string) : Promise<Task> {
        return this.taskModel.findOne({taskId: id})
    }

    async updateTask(id: string, newTask: TaskDto): Promise<Task> {
        return this.taskModel
            .findOneAndUpdate(
                {
                    taskId: id
                },
                newTask,
                {
                    new: true
                }
            )
    }

    async deleteTask(id: string) : Promise<Task> {
        return this.taskModel.findOneAndDelete({taskId: id})
    }

    async getTasksSummary() : Promise<TaskSummaryDto> {
        const tasks = await this.taskModel.find()
        const completedTasks = tasks.filter(task => task.status === TaskStatus.Completed).length
        const pendingTasks = tasks.filter(task => task.status == TaskStatus.Pending).length
        const inProgressTasks = tasks.filter(task => task.status == TaskStatus.InProgress).length
        let productivityRatio : number;

        if(pendingTasks > 0) {
            productivityRatio = ((completedTasks + inProgressTasks)/(pendingTasks*2))*100
        }

        return new TaskSummaryDto(
            tasks.length,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            productivityRatio,
        )

    }

}