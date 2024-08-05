import {TaskDto} from "@/dto/task.dto";
import {className} from "postcss-selector-parser";
import Image from "next/image";
import { TaskStatus } from "@/enums/TaskStatus";
import {parseDate} from "@/utils/dateUtils";
import {Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useState} from "react";
import { SelectGroup } from "@radix-ui/react-select";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import TextIconButton from "@/components/base/Button";
import IconInput from "@/components/base/IconInput";

export default function TaskCard(
    props: {
        task: TaskDto,
        onStatusChange: (status: string) => void,
        onDelete: (id: string) => void,
        onEdit: (title: string, description: string, date: string) => void,
        className?: string
    }
) {

    const [taskStatus, setTaskStatus] = useState<string>(props.task.status)
    const [taskTitle, setTaskTitle] = useState(props.task.title)
    const [taskDescription, setTaskDescription] = useState(props.task.description)
    const [taskDate, setTaskDate] = useState(props.task.dueDate)
    let bg: string;

    const updateStatus = (status: string) => {
        setTaskStatus(status)
        props.onStatusChange(status)
    }

    switch(props.task.status) {
        case TaskStatus.Pending : {
            bg = "bg-pending";
            break;
        }
        case TaskStatus.InProgress : {
            bg = "bg-progress";
            break;
        }
        default : {
            bg = "bg-completed";
            break;
        }
    }
    return (
        <div className={className + " h-fit shrink-0 rounded-lg bg-off-white shadow-lg p-3 select-none cursor-pointer hover:bg-neutral-100 transition-all inline-flex flex-col gap-y-5"}>
            <div className={"w-full h-fit inline-flex flex-row items-top  gap-x-4"}>
                <div className={bg + " w-fit h-fit p-4 rounded-lg"}>
                    <Image
                        src={'/assets/icons/note.svg'}
                        alt={"task icon"}
                        height={30}
                        width={30}
                    />
                </div>
                <div className={"w-4/5 inline-flex flex-col items-start gap-y-2"}>
                    <div className={bg + "/20 px-2 py-1 rounded-md"}>
                        <p className={"text-xs font-medium text-dark/40"}>{props.task.status}</p>
                    </div>
                    <p className={"w-full truncate text-lg font-black text-neutral-600"}>{props.task.title}</p>
                </div>
            </div>
            <div className={"inline-flex flex-row items-center gap-x-2"}>
                <Image
                    src={'/assets/icons/calendar.svg'}
                    alt={"calendar icon"}
                    height={24}
                    width={24}
                />
                <p className={"text-sm font-semibold text-dark/80"}>Due : {parseDate(props.task.dueDate)}</p>
            </div>
            <div className={"w-full h-fit inline-flex flex-row items-center justify-between"}>
                <div className={"inline-flex flex-row items-center gap-x-3"}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className={"h-[42px] w-[42px] p-2 rounded-lg bg-neutral-800 grid hover:bg-neutral-400 transition-all"}>
                                <Image
                                    src={'/assets/icons/edit.svg'}
                                    alt={"calendar icon"}
                                    height={18}
                                    width={18}
                                    className={"m-auto"}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className={"outline-none"}>
                            <DialogHeader>
                                <p className={"text-xl font-bold"}>Edit Task</p>
                                <p className={"text-sm font-normal text-dark/40"}>Update your task to match your needs</p>
                            </DialogHeader>
                            <DialogBody>
                                <div className="w-full inline-flex flex-col items-start gap-y-6 my-6">
                                    <div className="w-full h-fit inline-flex flex-col items-start gap-y-2">
                                        <p className="text-dark text-sm font-medium">
                                            Task Title *
                                        </p>
                                        <IconInput
                                            type={"text"}
                                            value={taskTitle}
                                            required={true}
                                            icon={'/assets/icons/task.svg'}
                                            label={"Eg, Go To the gym today"}
                                            onValueChange={(e) => setTaskTitle(e.target.value)}
                                            className={'w-full h-[56px]'}
                                        />
                                    </div>
                                    <div className="w-full h-fit inline-flex flex-col items-start gap-y-2">
                                        <p className="text-dark text-sm font-medium">
                                            Task Description *
                                        </p>
                                        <textarea
                                            value={taskDescription}
                                            required={true}
                                            placeholder={"Eg. Today will be a full body workout with emphasis on upper body fo more strength"}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            className={'w-full min-h-[120px] p-4 outline-none rounded-lg bg-off-white shadow-md'}
                                        ></textarea>
                                    </div>
                                    <div className="w-full h-fit inline-flex flex-col items-start gap-y-2">
                                        <p className="text-dark text-sm font-medium">
                                            Task Due at *
                                        </p>
                                        <IconInput
                                            type={"datetime-local"}
                                            value={taskDate}
                                            required={true}
                                            icon={'/assets/icons/calendar.svg'}
                                            label={""}
                                            onValueChange={(e) => setTaskDate(e.target.value)}
                                            className={'w-full h-[56px]'}
                                        />
                                    </div>
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <div className={"w-full inline-flex flex-row items-center justify-end gap-x-3"}>
                                    <DialogClose>
                                        <TextIconButton
                                            text={'Cancel'}
                                            icon={''}
                                            className={"outline-none border border-1 border-dark text-dark"}
                                        />
                                    </DialogClose>
                                    <DialogClose>
                                        <TextIconButton
                                            text={'Save updates'}
                                            icon={''}
                                            className={"outline-none px-3! bg-dark text-off-white text-sm font-normal"}
                                            onButtonClick={() => props.onEdit(taskTitle, taskDescription, taskDate)}
                                        />
                                    </DialogClose>

                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <div
                        className={"h-[42px] w-[42px] p-2 rounded-lg bg-pending grid hover:bg-pending/70 transition-all"}
                        onClick={() => props.onDelete(props.task.taskId)}>
                        <Image
                            src={'/assets/icons/trash.svg'}
                            alt={"calendar icon"}
                            height={18}
                            width={18}
                            className={"m-auto"}
                        />
                    </div>
                </div>
                <Select onValueChange={(status) => updateStatus(status)}>
                    <SelectTrigger className="w-[140px] h-[42px]">
                        <SelectValue placeholder={taskStatus}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value={TaskStatus.Pending}>{TaskStatus.Pending}</SelectItem>
                            <SelectItem value={TaskStatus.InProgress}>{TaskStatus.InProgress}</SelectItem>
                            <SelectItem value={TaskStatus.Completed}>{TaskStatus.Completed}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}