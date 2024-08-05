'use client'

import IconInput from "@/components/base/IconInput";
import {useState} from "react";
import TextIconButton from "@/components/base/Button";
import {createNewTask} from "@/api/operations.api";
import {toast} from "@/components/ui/use-toast";

export default function NewTaskPage() {
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskDate, setTaskDate] = useState("")

    const createTask = () => {
        createNewTask(
            taskTitle,
            taskDescription,
            taskDate
        )
            .then((result) => {
                toast({
                    variant: "default",
                    title: "Task Created Successfully",
                    description: "Now go there and finish them up tasks 💪"
                })
                setTaskTitle("")
                setTaskDescription("")
            })
            .catch(error => {
                console.log(error)
                toast({
                    variant: "destructive",
                    title: "Failed to create new task",
                    description: "Make sure all your data is correct and try again."
                })
            })
    }

    return <div className="w-full p-10 max-h-full overflow-scroll overflow-x-hidden">
        <p className="text-3xl font-bold text-off-white mb-10">
            Let's create a new task for you 😎
        </p>

        <div className="w-2/3 inline-flex flex-col items-start gap-y-6">
            <div className="w-full h-fit inline-flex flex-col items-start gap-y-2">
                <p className="text-off-white text-lg font-medium">
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
                <p className="text-off-white text-lg font-medium">
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
                <p className="text-off-white text-lg font-medium">
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

        <p className="text-3xl font-bold text-off-white my-10">
            Now all you have to do is 👇
        </p>
        
        <TextIconButton
            text={'Create Task'}
            icon={'/assets/icons/new_task.svg'}
            onButtonClick={createTask}
            className={"w-[256px] h-[56px] bg-transparent border border-off-white border-1 text-off-white hover:bg-completed  transition-all"}
        />

    </div>
}