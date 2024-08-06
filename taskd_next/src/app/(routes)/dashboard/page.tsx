import {getTasks, getTaskSummary} from "@/api/tasks.api";
import SummaryContent from "./content"
import {TrendingDown, TrendingUp} from "lucide-react";
import {TaskStatus} from "@/enums/TaskStatus";
import Task from "@/components/base/Task";
import {isDateDue} from "@/utils/dateUtils";


export default async function SummaryPage() {

     const taskSummary = await getTaskSummary()
         .catch((error) => {
             return undefined
         });

     const tasks = await getTasks().catch((error) => {
         return undefined
     });

    return <div className="w-full p-10 max-h-full overflow-scroll overflow-x-hidden">
        <p className="text-3xl font-bold text-off-white mb-10">
            Hey! 👋 Review Your summary
        </p>
        <div className="w-full h-fit grid grid-cols-3 gap-x-5">
            <div className="w-full h-full bg-off-white p-5 rounded-lg shadow-lg">
                <SummaryContent
                    summary={taskSummary}
                />
                <p className="mx-auto w-[90%] text-center font-bold text-lg">Tasks divided by status</p>
            </div>
            <div
                className="w-full h-full bg-off-white p-5 rounded-lg shadow-lg inline-flex flex-col items-center justify-center">
                <div className="w-full h-[80%] grid items-center justify-center">
                    <p className="text-9xl font-black text-gradient">
                        {taskSummary?.totalUserTasks}
                    </p>
                </div>

                <p className="mx-auto w-[90%] text-center font-bold text-lg">All the tasks you have created so far.</p>
            </div>

            <div
                className="w-full h-full bg-off-white p-5 rounded-lg shadow-lg inline-flex flex-col items-center justify-center">
                <div className="w-full h-[80%] grid items-center justify-center">
                    <p className="text-7xl font-black text-gradient">
                        {taskSummary?.productivityRatio}%
                    </p>
                </div>

                <div className="w-fit h-fit inline-flex flex-row items-center justify-center gap-x-3">
                    <p className="text-center font-bold text-lg">Your productivity ratio is </p>
                    {taskSummary?.productivityRatio && taskSummary?.productivityRatio > 100
                        ? <TrendingUp className="h-4 w-4"/>
                        : <TrendingDown className="h-4 w-4"/>
                    }
                </div>

            </div>

        </div>
        <p className="text-3xl font-bold text-off-white my-10">
            Some pending tasks are waiting for you
        </p>
        <div className="w-full h-fit inline-flex flex-col items-center gap-y-4">
            {tasks
                ?.filter((task) => task.status === TaskStatus.Pending && isDateDue(task.dueDate))
                ?.map((task) => {
                    return <Task
                        key={task.taskId}
                        task={task}
                        className={"w-full h-fit bg-off-white"}
                    />
                })
            }
        </div>
    </div>
}