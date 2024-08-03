import {Body, Controller, Delete, Get, Param, Post, Put, Res} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {TaskDto} from "../dto/task.dto";
import {Response} from "express";
import {Task} from "../schemas/task.schema";
import {TaskSummaryDto} from "../dto/taskSummary.dto";


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Post()
    async createTask(@Body() taskDto: TaskDto, @Res() response: Response) {
        let result : Task;

        try {
            result = await this.taskService.createTask(taskDto)
        } catch (error) {
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error creating task, please try again."
                })
        }

        return response
            .status(201)
            .send(result)
    }

    @Get()
    async findAllTasks(@Res() response: Response) {
        let tasks: Task[];

        try {
            tasks = await this.taskService.getAllTasks();
        } catch (error) {
            return response.status(500).send({
                error: true,
                statusCode: 500,
                message: "Error getting tasks"
            })
        }

        if (!tasks) {
            response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: "Error finding any task"
                })
        }

        return response
            .status(200)
            .send(tasks)

    }

    @Get('summary')
    async getTaskSummary(@Res() response: Response) {
        let taskSummary: TaskSummaryDto;

        try {
            taskSummary = await this.taskService.getTasksSummary()
        } catch (error) {
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error getting tasks summary"
                })
        }

        return response
            .status(200)
            .send(taskSummary)

    }

    @Get(':id')
    async findTaskById(@Param() params: any, @Res() response: Response) {
        let task: Task;

        try {
            task = await this.taskService.getTaskById(params.id)
        } catch (error) {
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error getting the task"
                })
        }

        if (!task) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        return response
            .status(200)
            .send(task)

    }

    @Put(':id')
    async updateTask(
        @Param() params: any,
        @Body() taskDto: TaskDto,
        @Res() response: Response
    ) {
        let resultTask: Task;

        try {
            resultTask = await this.taskService.updateTask(params.id, taskDto)
        } catch (error) {
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error updating this task"
                })
        }

        if(!resultTask) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        return response
            .status(200)
            .send(resultTask)

    }

    @Delete(':id')
    async deleteTask(@Param() params: any, @Res() response: Response) {
        let resultTask: Task;

        try {
            resultTask = await this.taskService.deleteTask(params.id);
        } catch(error) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: "Error deleting task, please try again."
                })
        }

        if(!resultTask) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        return response
            .status(200)
            .send(resultTask)
    }

}