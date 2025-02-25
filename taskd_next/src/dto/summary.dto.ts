
export class SummaryDto {

    constructor(
        totalUserTasks: number,
        totalCompletedTasks: number,
        totalPendingTasks: number,
        totalTasksInProgress: number,
        productivityRatio: number,
    ) {
        this.totalUserTasks = totalUserTasks
        this.totalCompletedTasks = totalCompletedTasks;
        this.totalPendingTasks = totalPendingTasks;
        this.totalTasksInProgress = totalTasksInProgress;
        this.productivityRatio = productivityRatio
    }

    totalUserTasks: number
    totalCompletedTasks: number
    totalPendingTasks: number
    totalTasksInProgress: number
    productivityRatio: number
}