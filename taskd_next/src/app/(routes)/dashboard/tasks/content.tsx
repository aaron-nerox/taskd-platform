'use client'

import {TaskDto} from "@/dto/task.dto";
import TaskCard from "@/components/base/TaskCard";
import {TaskStatus} from "@/enums/TaskStatus";
import BoardHeader from "@/components/base/BoardHeader";
import {deleteTask, updateTask} from "@/api/operations.api";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

export default function TasksContent(
    props: {
        tasks: TaskDto[]
    }
) {
    const router = useRouter();

    const deleteTaskConfirmation = (taskId: string) => {
        toast({
            variant: "destructive",
            title: "Are you sure you want to delete this task?",
            action: <ToastAction altText={"Yes, Delete"} onClick={() => deleteTaskById(taskId)}>
                Yes, Delete
            </ToastAction>
        })
    }

    const deleteTaskById = (taskId: string) => {
        deleteTask(taskId, router).then((result) => {
            toast({
                variant: "default",
                title: "task deleted successfully"
            })
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Failed to delete task",
                description: "It might be on us, But, make sure your internet connection is stable."
            })
        })
    }
    const updateTaskInfo = (
        task: TaskDto,
        newTitle: string,
        newDescription: string,
        newDate: string
    ) => {
        const updatedTask = new TaskDto(
            task.taskId,
            newTitle,
            newDescription,
            newDate,
            task.status
        )

        updateTaskStatus(updatedTask, task.status)
    }

    const updateTaskStatus = (task: TaskDto, status: string) => {
        console.log(task)
        updateTask(
            task.taskId,
            task.title,
            task.description,
            task.dueDate,
            status,
            router
        ).then((result) => {
            toast({
                variant: "default",
                title: "task updated successfully"
            })
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Failed to update task",
                description: "It might be on us, But, make sure your internet connection is stable."
            })
        })
    }

    return <div className={"w-full max-w-full overflow overflow-x-scroll top-scroll pb-3"}>
        <div className={"w-[120%] h-full grid grid-cols-3 gap-7 top-scroll mt-5"}>
            <div className={"w-full inline-flex flex-col gap-y-3"}>
                <BoardHeader
                    title={'Pending'}
                    type={'bg-pending'}
                />
                {
                    props.tasks
                        .filter((task) => task.status === TaskStatus.Pending)
                        .map((task: TaskDto) => {
                            return (
                                <TaskCard
                                    key={task.taskId}
                                    task={task}
                                    className={"w-full"}
                                    onDelete={deleteTaskConfirmation}
                                    onEdit={(title, description, date) => {updateTaskInfo(task, title, description, date)}}
                                    onStatusChange={(status) => { updateTaskStatus(task, status)}}
                                />
                            )
                        })
                }
            </div>
            <div className={"w-full inline-flex flex-col gap-y-3"}>
                <BoardHeader
                    title={'In Progress'}
                    type={'bg-progress'}
                />
                {
                    props.tasks
                        .filter((task) => task.status === TaskStatus.InProgress)
                        .map((task: TaskDto) => {
                            return (
                                <TaskCard
                                    key={task.taskId}
                                    task={task}
                                    onDelete={deleteTaskById}
                                    onEdit={() => {}}
                                    onStatusChange={(status) => { updateTaskStatus(task, status)}}
                                />
                            )
                        })
                }
            </div>
            <div className={"w-full inline-flex flex-col gap-y-3"}>
                <BoardHeader
                    title={'Completed'}
                    type={'bg-completed'}
                />
                {
                    props.tasks
                        .filter((task) => task.status === TaskStatus.Completed)
                        .map((task: TaskDto) => {
                            return (
                                <TaskCard
                                    key={task.taskId}
                                    task={task}
                                    onDelete={deleteTaskById}
                                    onEdit={() => {}}
                                    onStatusChange={(status) => { updateTaskStatus(task, status)}}
                                />
                            )
                        })
                }
            </div>

        </div>
    </div>

}