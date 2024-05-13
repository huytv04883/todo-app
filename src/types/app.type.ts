import { Dispatch, SetStateAction } from "react";

export type RemainingTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export type TaskItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: Date | null;
    remainingTime?: RemainingTime
}

export type ITodoItemProps = {
    data: TaskItem[];
    tasks: TaskItem[];
    setTasks: (item: TaskItem[]) => void;
}

export type ErrorMsg = {
    title: string;
    description: string;
    dueDate: string;
}

export type ITodoHeaderProps = {
    tasks: TaskItem[];
    setTasks: (item: TaskItem[]) => void;
}

export type ITodoFooterProps = {
    filter: string;
    countNumber: number;
    setFilter: Dispatch<SetStateAction<"all" | "completed" | "pending">>;
}
