export interface GoalRequest {
    title: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
}
export interface GoalResponse extends GoalRequest {
    id: string;
    completed: boolean;
}