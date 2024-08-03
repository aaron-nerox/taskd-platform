import {Body, Controller, Delete, Get, Param, Post, Put, Res} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {TaskDto} from "../dto/task.dto";
import {Response} from "express";


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Post()
    async createTask(@Body() taskDto: TaskDto, @Res() response: Response) {
        if(!taskDto) {
            return response.status(400).send({
                error: true,
                message: "Please specify a task to add"
            })
        }

        const result = await this.taskService.createTask(taskDto)

        if(!result) {
            return response.status(500).send({
                error: true,
                message: "Error creating task, please try again."
            })
        }

        return response.status(201).send(result)
    }

    @Get()
    async findAllTasks(@Res() response: Response) {
        const result = await this.taskService.getAllTasks();

        if(!result) {
            response.status(404).send({
                error: true,
                message: "Error finding any task"
            })
        }

        return response.status(200).send(result)
    }

    @Get('summary')
    async getTaskSummary(@Res() response: Response) {
        const result =  await this.taskService.getTasksSummary()
        return response.status(200).send(result)
    }

    @Get(':id')
    async findTaskById(@Param() params: any, @Res() response: Response) {
        const result = await this.taskService.getTaskById(params.id)

        if(!result) {
            return response.status(404).send({
                error: true,
                message: `Error finding task with specified id ${params.id}`
            })
        }

        return response.status(200).send(result)
    }

    @Put(':id')
    async updateTask(
        @Param() params: any,
        @Body() taskDto: TaskDto,
        @Res() response: Response
    ) {
        if(!taskDto) {
            return response.status(400).send({
                error: true,
                message: "Please specify a task to add"
            })
        }

        const result = await this.taskService.updateTask(params.id, taskDto)

        if(!result) {
            return response.status(500).send({
                error: true,
                message: "Error updating task, please try again."
            })
        }

        return response.status(200).send(result)
    }

    @Delete(':id')
    async deleteTask(@Param() params: any, @Res() response: Response) {
        const result = await this.taskService.deleteTask(params.id)

        if(!result) {
            return response.status(404).send({
                error: true,
                message: "Error deleting task, please try again."
            })
        }

        return response.status(200).send(result)
    }

}