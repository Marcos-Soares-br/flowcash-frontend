<script setup lang="ts">
    import type { GoalResponse } from '~/types/goal';

    defineProps<{
        goals: GoalResponse[];
        from: string;
    }>();

    const emit = defineEmits<{
        (e: 'create'): void;
        (e: 'edit', goal: GoalResponse): void;
    }>();

    const goalStore = useGoalStore();

    function deleteGoal(id: string) {
        if (confirm('Tem certeza que deseja excluir essa meta?')) {
            try {
                goalStore.deleteGoal(id);

            } catch (error) {
                alert(error);
            }
        }
    }
</script>

<template>
        <p :class="[goals.length === 0  && from === 'metas' ? '' : 'hidden', 'text-secondary mx-auto']">
            Nenhuma meta cadastrada ainda
        </p>

        <div v-if="goals.length > 0">
            <h2 class="text-md font-semibold text-secondary mb-3">
                Metas
            </h2>

            <div class="space-y-4">
                <div
                    v-for="goal in goals" :key="goal.id"
                    class="bg-card rounded-xl p-4"
                >
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <span>
                                <Icon :name="goal.icon" class="text-foreground w-8 h-8"/>
                            </span>

                            <p class="text-sm h-5 text-foreground font-semibold">
                                {{ goal.title }}
                            </p>
                        </div>

                        <div class="flex items-center gap-2">
                            <Icon
                                name="lucide:pencil"
                                class="w-5 h-5 text-secondary hover:text-secondary-hover ml-auto cursor-pointer"
                                @click="emit('edit', goal)"
                            />

                            <Icon
                                name="lucide:trash"
                                class="w-5 h-5 text-secondary hover:text-secondary-hover cursor-pointer"
                                @click="deleteGoal(goal.id)"
                            />
                        </div>
                    </div>

                    <div
                        v-if="from === 'metas'"
                        class="flex flex-col gap-2 text-sm text-secondary mb-1"
                    >
                        <span class="mt-2 sensitive">
                            Valor alvo:
                            {{
                                goal.targetAmount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                            }}
                        </span>

                        <div class="flex items-center">
                            <span class="sensitive">
                                Valor atual:
                                {{
                                    goal.currentAmount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                                }}
                            </span>

                            <span class="text-primary font-medium ml-auto">
                                {{
                                    ( (goal.currentAmount /goal.targetAmount) *100 ).toFixed(0)
                                }}
                                %
                            </span>
                        </div>
                    </div>

                    <div
                        v-else
                        class="flex justify-between text-xs text-secondary mb-1"
                    >
                        <span class="sensitive">
                            {{
                                goal.currentAmount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                            }}
                            /
                            {{
                                goal.targetAmount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                            }}
                        </span>

                        <span class="text-primary font-medium">
                            {{
                                ( (goal.currentAmount / goal.targetAmount) * 100 ).toFixed(0)
                            }}%
                        </span>
                    </div>

                    <div class="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div
                            class="h-full bg-primary rounded-full"
                            :style="`width: ${(goal.currentAmount / goal.targetAmount) * 100}%`"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="from === 'metas'" class="w-36 mx-auto">
            <UiButton
                @click="emit('create')"
            >
                <Icon name="lucide:plus" class="w-5 h-5" /> Metas
            </UiButton>
        </div>
</template>