<script setup lang="ts">
    import type { Transaction } from '~/types/transaction';

    const transactionStore = useTransactionStore();

    const props = defineProps({
        pendingTransactions: {
            type: [] as PropType<Transaction[]>,
            default: []
        },
        valuesHidden: {
            type: Boolean,
            default: false
        } 
    });

    async function updateTransactionStatus(id: string, status: Transaction['status']) {
        try {
            await transactionStore.updateTransaction(id, { status });
        } catch (error) {
            alert(error);
        }
    }
</script>

<template>
    <h2 class="text-md font-semibold text-secondary mb-3">Contas Pendentes</h2>
    <div class="grid md:grid-cols-2 gap-y-2 gap-x-6">
        <div
            v-for="transaction in pendingTransactions"
            class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3"
        >
            <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <Icon name="lucide:alert-circle" class="w-5 h-5 text-amber-400" />
            </div>
            <div>
                <p class="text-sm font-semibold text-amber-300">{{ transaction.title }} Pendente</p>
                <p class="text-xs text-amber-400/70">
                    {{ new Date(transaction.date).toLocaleString('pt-BR', { day: '2-digit', month: 'short'}) }} - 
                    <span :class="[valuesHidden  ? 'blur user-select-none': '']">{{ transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</span>
                </p>
            </div>
            <button 
                @click="updateTransactionStatus(transaction.id, 'COMPLETED')"
                class="ml-auto bg-amber-400 hover:bg-amber-500 text-background font-semibold rounded-xl px-4 py-2"
            >
                {{ transaction.type === 'INCOME' ? 'Receber' : 'Pagar' }}
            </button>
        </div>
    </div>
</template>