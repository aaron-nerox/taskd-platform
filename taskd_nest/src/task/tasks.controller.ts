import {Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {TaskDto} from "../dto/task.dto";
import {Response} from "express";
import {Task} from "../schemas/task.schema";
import {TaskSummaryDto} from "../dto/taskSummary.dto";
import {AuthGuard} from "../auth/auth.guard";

/**
 * Tasks Controller
 * This controller hosts all the crud methods to handle task records plus task summary endpoint.
 * this controller has an AuthGuard set up to handle user authorization when accessing these endpoints.
 * so, they are not public, unless you hit @Post/auth/login first you will not be able to use them.
 */
@Controller('tasks')
export class TasksController {

    //Inject task service for usage inside endpoints
    constructor(private taskService: TasksService) {}

    /**
     * @method POST
     * @params taskDto: TaskDto
     * @return newly created task
     */
    @Post()
    @UseGuards(AuthGuard)
    async createTask(@Body() taskDto: TaskDto, @Res() response: Response) {
        let result : Task;

        try {
            result = await this.taskService.createTask(taskDto)
        } catch (error) {
            //handle db error or any other unexpected error
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error creating task, please try again."
                })
        }

        //otherwise send response back
        return response
            .status(201)
            .send(result)
    }

    /**
     * @method GET
     * @return List of all tasks
     */
    @Get()
    @UseGuards(AuthGuard)
    async findAllTasks(@Res() response: Response) {
        let tasks: Task[];

        try {
            tasks = await this.taskService.getAllTasks();
        } catch (error) {
            //handle crash by sending back internal server error
            return response.status(500).send({
                error: true,
                statusCode: 500,
                message: "Error getting tasks"
            })
        }

        //if the tasks are undefined means either no tasks found or an issue with db so send 404
        if (!tasks) {
            response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: "Error finding any task"
                })
        }

        //send response
        return response
            .status(200)
            .send(tasks)

    }

    /**
     * @method GET
     * @return the tasks summary for that user
     */
    @Get('summary')
    @UseGuards(AuthGuard)
    async getTaskSummary(@Res() response: Response) {
        let taskSummary: TaskSummaryDto;

        try {
            taskSummary = await this.taskService.getTasksSummary()
        } catch (error) {
            //handle crash by sending back internal server error
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error getting tasks summary"
                })
        }

        //return correct response
        return response
            .status(200)
            .send(taskSummary)

    }

    /**
     * @method GET
     * @params id
     * returns a single task from supplied id
     */
    @Get(':id')
    @UseGuards(AuthGuard)
    async findTaskById(@Param() params: any, @Res() response: Response) {
        let task: Task;

        try {
            task = await this.taskService.getTaskById(params.id)
        } catch (error) {
            //handle crash by sending back internal server error
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error getting the task"
                })
        }

        //if no data found or issue with id send 404
        if (!task) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        //send correct response
        return response
            .status(200)
            .send(task)

    }

    /**
     * @method PUT
     * @params id
     * @params taskDto
     * updates a task and returns the updated version
     */
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateTask(
        @Param() params: any,
        @Body() taskDto: TaskDto,
        @Res() response: Response
    ) {
        let resultTask: Task;

        try {
            resultTask = await this.taskService.updateTask(params.id, taskDto)
        } catch (error) {
            //handle crash by sending back internal server error
            return response
                .status(500)
                .send({
                    error: true,
                    statusCode: 500,
                    message: "Error updating this task"
                })
        }

        //if data is not found that might be an issue with either id or db so send 404
        if(!resultTask) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        //return correct response
        return response
            .status(200)
            .send(resultTask)

    }

    /**
     * @method DELETE
     * @params id
     * returns the deleted task once it is deleted
     */
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteTask(@Param() params: any, @Res() response: Response) {
        let resultTask: Task;

        try {
            resultTask = await this.taskService.deleteTask(params.id);
        } catch(error) {
            //handle crash by sending back internal server error
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: "Error deleting task, please try again."
                })
        }

        //if no data found or there is an issue with db return 404
        if(!resultTask) {
            return response
                .status(404)
                .send({
                    error: true,
                    statusCode: 404,
                    message: `Error finding task with specified id ${params.id}`
                })
        }

        //return correct response
        return response
            .status(200)
            .send(resultTask)
    }

}