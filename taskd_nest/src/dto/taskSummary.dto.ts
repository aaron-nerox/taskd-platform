/**
 * Task summary data transfer object
 * used to return a summary via an endpoint
 */
export class TaskSummaryDto {
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