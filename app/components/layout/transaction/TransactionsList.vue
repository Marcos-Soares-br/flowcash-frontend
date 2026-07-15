<script setup lang="ts">
import type { Transaction } from '~/types/transaction'

const props = defineProps<{
    transactions: Record<string, Transaction[]>
}>()

const emit = defineEmits<{
    edit: [{ transaction: Transaction }]
}>()

const isIncome = (type: string) => type === 'INCOME'
</script>

<template>
    <div
        v-for="(list, date) in transactions"
        :key="date"
        class="mx-auto max-w-[800px] flex flex-col md:flex-row mb-12 gap-6"
    >
        <span class="md:w-12 md:h-12 flex items-center gap-1 md:justify-center rounded-xl md:bg-white/10 text-md md:text-lg text-foreground font-semibold">
            <span class="md:hidden">Dia</span> 
            <span>{{ date.slice(8, 10) }}</span>
        </span>

        <div class="flex flex-col flex-1">
            <div
                v-for="transaction in list" :key="transaction.id"
                @click="emit('edit', { transaction })"
                :class="['flex items-center gap-4 border-b border-border py-4', transaction.id.includes('projected') ? '' : 'hover:bg-border cursor-pointer']"
            > 
                <div :class="[isIncome(transaction.type) ? 'bg-success/10' : 'bg-error/10','flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full']">
                    <Icon :name="getIcon(transaction.category) as string" v-if="isIncome(transaction.type)" class="w-6 h-6 text-success"/>
                    <Icon :name="getIcon(transaction.category) as string" v-else class="w-6 h-6 text-error"/>
                </div>

                <div class="w-full h-12 grid grid-cols-2 md:grid-cols-[315px_150px_7px] items-center gap-6 md:gap-12">
                    <div class="flex flex-col md:flex-row md:justify-between">
                        <p class="text-base text-foreground font-semibold">
                            {{ transaction.title }}
                        </p>
                        <p class="text-sm md:text-base md:font-semibold text-secondary truncate">
                            {{ transaction.account.name }}
                        </p>
                    </div>

                    <div class="flex flex-col items-end md:flex-row md:justify-between">
                        <p :class="[ transaction.type === 'INCOME' ? 'text-success' : 'text-error', 'text-base font-semibold sensitive text-right ml-auto mr-2']">
                            {{
                                transaction.amount.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                            }}
                        </p>
                        <p class="md:hidden text-sm md:font-semibold text-secondary truncate">
                            <span>{{ transaction.status === 'COMPLETED' ? 'Pago' : 'Pendente' }}</span>
                        </p>
                    </div>
                    
                    <Icon 
                        class="hidden md:block text-secondary w-6 h-6 mt-1" 
                        :name="transaction.status === 'COMPLETED' ? 'lucide:check' : 'lucide:clock'" 
                    />
                    
                </div>
            </div>
        </div>
    </div>

</template>