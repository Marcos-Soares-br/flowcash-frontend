<script setup lang="ts">
    import type { Transaction } from '~/types/transaction';

    const props = defineProps({
        nearbyTransactions: {
            type: [] as PropType<Transaction[]>,
            default: []
        },
        valuesHidden: {
            type: Boolean,
            default: false
        } 
    });
    
</script>

<template>
    <div v-if="nearbyTransactions.length > 0">
        <h2 class="text-md font-semibold text-secondary mb-3">Transações próximas</h2>
        <div class="space-y-2">
            <div 
                v-for="transaction in nearbyTransactions as Transaction[]"
                class="bg-card rounded-xl p-4 flex items-center gap-3"
            >
                <div 
                    v-if="transaction.type == 'INCOME'" 
                    class="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center"
                >
                    <Icon name="lucide:arrow-down-left" class="w-4 h-4 text-success" />
                </div>
                <div 
                    v-else 
                    class="w-9 h-9 rounded-full bg-error/10 flex items-center justify-center"
                >
                    <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-error" />
                </div>

                <div class="flex-1">
                    <p class="text-sm font-medium text-foreground ">{{ transaction.title }}</p>
                    <p class="text-xs text-gray-500">{{ new Date(transaction.date).toLocaleString('pt-BR', { day: '2-digit', month: 'short'}) }}</p>
                </div>
                <p :class="[valuesHidden  ? 'blur user-select-none': '', 'text-sm font-bold sensitive']">
                    <span :class="[transaction.type == 'INCOME' ? 'text-success' : 'text-error']">
                        {{ transaction.type == 'INCOME' ? '+' : '-' }}
                        {{ transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}
                    </span>
                </p>
            </div>
            
        </div>
    </div>
</template>