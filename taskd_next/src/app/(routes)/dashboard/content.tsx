'use client'

import {SummaryDto} from "@/dto/summary.dto";
import {Label, Pie, PieChart} from "recharts";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import React from "react";


export default function SummaryContent(props: {summary: SummaryDto | undefined}) {
    const chartConfig = {
        amount: {
            label: "Amount",
        },
        pending: {
            label: "Pending",
            color: "#ff304a",
        },
        completed: {
            label: "Completed",
            color: "#01df63",
        },
        inProgress: {
            label: "In Progress",
            color: "#ffbb06",
        }
    } satisfies ChartConfig;

    const chartData = [
            { status: "Pending", amount: props.summary?.totalPendingTasks, fill: "#ff304a" },
            { status: "Completed", amount: props.summary?.totalCompletedTasks, fill: "#01df63"},
            { status: "In Progress", amount: props.summary?.totalTasksInProgress, fill: "#ffbb06" },
        ]

    return <ChartContainer config={chartConfig} >
        <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                dataKey='amount'
                nameKey='status'
                data={chartData}
                innerRadius={30}
                strokeWidth={1}
                className="w-[126px] h-[126px]"
            />
        </PieChart>
    </ChartContainer>
}