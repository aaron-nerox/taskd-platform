import {getTasks} from "@/api/tasks.api";
import {TaskDto} from "@/dto/task.dto";
import TasksContent from "@/app/(routes)/dashboard/tasks/content";

export default async function TasksBoardPage() {

    let tasks : TaskDto[] = [];
    let headerText: string = "Review your Kanban board"

    const result = await getTasks()
        .catch((error) => {})

    if(result) {
        tasks = result
    }

    if(tasks.length === 0) {
        headerText = "Your Board is empty, get started by creating a new task"
    } else if(tasks.length < 5) {
        headerText = "Things are slow but you can make it better 👌"
    } else {
        headerText = "Things are busy over here, let's keep going 🔥"
    }

    return (
        <div className={"max-w-full p-5 max-h-full overflow-scroll overflow-x-hidden"}>
            <p className="text-3xl font-bold text-off-white mb-3 mt-5">
                Tasks Kanban Board
            </p>
            <p className="text-lg font-medium text-off-white mb-10">
                {headerText}
            </p>
            <TasksContent tasks={tasks}/>
        </div>
    )
}