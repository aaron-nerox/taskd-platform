import {Module} from "@nestjs/common";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TaskSchema} from "../schemas/task.schema";

/**
 * Task Module
 * This Module contains service points for the task schema for crud operations on tasks
 * @controller TasksController
 * @module MongooseModule
 * @link TaskService
 */
@Module({
    imports: [MongooseModule.forFeature([{
            name: Task.name,
            schema: TaskSchema
        }])
    ],
    exports: [],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}