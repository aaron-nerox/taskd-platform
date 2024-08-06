import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "../schemas/task.schema";
import {Model} from "mongoose";
import {TaskDto} from "../dto/task.dto";
import {TaskSummaryDto} from "../dto/taskSummary.dto";
import {TaskStatus} from "../enums/TaskStatus";
import {v4 as uuid4} from "uuid";

/**
 * This is a service that handles
 * creating, updating and deleting tasks
 * accessing a single or multiple tasks
 */
@Injectable()
export class TasksService {
    //we inject the Task schema into our module for use to interact with db
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    /**
     * This is a method for creating a new task,
     * it uses uuid4 to inject a unique id into the task dto before creating a db record
     * @params task : TaskDto
     * @return Promise<Task>
     */
    async createTask(task: TaskDto) : Promise<Task> {
        task.setId(uuid4())
        const createdTask = new this.taskModel(task)
        return createdTask.save()
    }

    /**
     * This is a method that returns all tasks in db
     * @return Promise<Task[]>
     */
    async getAllTasks(userId: string): Promise<Task[]> {
        return this.taskModel.find({taskUserId : userId});
    }

    /**
     * This is a method that returns a single task object based on id
     * @params id : string
     * @return Promise<Task>
     */
    async getTaskById(id: string, userId: string) : Promise<Task> {
        return this.taskModel.findOne({taskId: id, taskUserId: userId})
    }

    /**
     * This is a method that updates a task db record based on a new one
     * @params id: string
     * @params newTask: TaskDto
     * @return Promise<Task>
     */
    async updateTask(id: string, newTask: TaskDto): Promise<Task> {
        return this.taskModel
            .findOneAndUpdate(
                {
                    taskId: id,
                    taskUserId: newTask.taskUserId
                },
                newTask,
                {
                    new: true
                }
            )
    }

    /**
     * This is a method that deletes a task using its id
     * @params id: string
     * @return Promise<Task>
     */
    async deleteTask(id: string, userId: string) : Promise<Task> {
        return this.taskModel.findOneAndDelete({taskId: id, taskUserId: userId})
    }

    /**
     * This is a method that generates a summary for a user
     * it basically gets a list of tasks and returns number of
     * completed, in progress and pending tasks as well as a productivity ratio.
     * Productivity ratio can be calculated like follows ((completed + in progress)/pending*2)*100
     * max ratio will be 200 with no pending tasks and min will be 0 with no completed or in progress tasks
     */
    async getTasksSummary(userId: string) : Promise<TaskSummaryDto> {
        const tasks = await this.taskModel.find({taskUserId: userId})
        const completedTasks = tasks.filter(task => task.status === TaskStatus.Completed).length
        const pendingTasks = tasks.filter(task => task.status == TaskStatus.Pending).length
        const inProgressTasks = tasks.filter(task => task.status == TaskStatus.InProgress).length
        let productivityRatio : number;

        //if there is no pending tasks return 200 to avoid returning undefined
        if(pendingTasks > 0) {
            //use to Fixed method to limit floating points to just two
            productivityRatio = parseFloat((((completedTasks + inProgressTasks)/(pendingTasks*2))*100).toFixed(2));
        } else {
            productivityRatio = 200
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