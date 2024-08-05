import {getTasks} from "@/api/tasks.api";

export default async function ConnectPage() {

    let tasks: any[] = [];

     tasks = await getTasks();

    return <div>
        {
            tasks && tasks.map((task) => {
                return <p>{task.title}</p>
            })
        }
    </div>
}