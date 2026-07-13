import type { GoalRequest, GoalResponse } from "~/types/goal";

export const goalService = {
    async getAll() {
        const api = useApi();

        return await api<GoalResponse[]>('/goals', {
            method: 'GET'
        });
    },

    async get(id: string) {
        const api = useApi();

        return await api<GoalResponse>(`/goals/${id}`, {
            method: 'GET'
        });
    },

    async create(goal: GoalRequest) {
        const api = useApi();

        return await api<GoalResponse>('/goals', {
            method: 'POST',
            body: goal
        });
    },

    async update(id: string, goal: GoalRequest) {
        const api = useApi();

        return await api<GoalResponse>(`/goals/${id}`, {
            method: 'PUT',
            body: goal
        });
    },

    async delete(id: string) {
        const api = useApi();

        return await api(`/goals/${id}`, {
            method: 'DELETE'
        });
    }
};