import type { GoalResponse,GoalRequest } from "~/types/goal";
import { goalService } from '../../services/goal.service';

export const useGoalStore = defineStore('goals', {
    state: () => ({
        loaded: false,
        goals: [] as GoalResponse[],
    }),
    
    actions: {
        async getGoals(force = false) {
            try {
                if (this.loaded && !force) return;

                const response = await goalService.getAll();

                response.forEach(goal => {
                    goal.targetAmount = Number(Number(goal.targetAmount).toFixed(2)); 
                    goal.currentAmount = Number(Number(goal.currentAmount).toFixed(2))
                });

                this.goals = response;

                this.loaded = true;

                return response;

            } catch (error) {
                throw error;
            }
        },

        async getGoal(id: string) {
            try {
                const cached = this.goals.find(goal => goal.id === id);

                if (cached) return cached;
                
                return goalService.get(id);

            } catch (error) {
                throw error;
            }
        },

        async createGoal(goal: GoalRequest) {
            try {
                const response = await goalService.create(goal);

                this.goals.push(response);

                return response;

            } catch (error) {
                throw error;
            }
        },

        async updateGoal(id: string, goal: GoalRequest) {
            try {
                const response = await goalService.update(id, goal);

                const index = this.goals.findIndex(goal => goal.id === id);

                this.goals[index] = response;

                return response;

            } catch (error) {
                throw error;
            }
        },

        async deleteGoal(id: string) {
            try {
                await goalService.delete(id);

                const index = this.goals.findIndex(goal => goal.id === id);

                this.goals.splice(index, 1);

            } catch (error) {
                throw error;
            }
        },
    }
});