<script setup lang="ts">
    import type { Transaction } from '~/types/transaction'
    import type { UnifiedTransaction } from '~/types/unified-transaction'

    import BaseModal from '~/components/common/BaseModal.vue'
    import MonthNavigator from '~/components/common/MonthNavigator.vue'
    import TransactionForm from '~/components/forms/transaction/TransactionForm.vue'
    import BalanceSummary from '~/components/layout/transaction/BalanceSummary.vue'
    import TransactionsList from '~/components/layout/transaction/TransactionsList.vue'


    definePageMeta({
        middleware: 'auth'
    })

    const filterVisible = ref(false)
    const transactionsBtnVisible = ref(false)

    const transactionStore = useTransactionStore()
    const accountStore = useAccountStore()
    const creditCardStore = useCreditCardStore()

    const accounts = computed(() => accountStore.accounts)
    const cards = computed(() => creditCardStore.creditCards)

    const currentMonth = ref(new Date())

    const monthToRequest = computed(() => {
        const year = currentMonth.value.getFullYear()
        const month = String(currentMonth.value.getMonth() + 1).padStart(2, '0')
        return `${year}-${month}`
    })

    watch(
        monthToRequest,
        async month => {
            await transactionStore.getReport(month)
        },
        { immediate: true }
    )

    const report = computed(() =>
        transactionStore.getReportByMonth(monthToRequest.value)
    )

    const allTransactions = computed<UnifiedTransaction[]>(() => {
        const transactions = report.value?.transactions ?? []

        const creditTransactions =
            (report.value?.creditTransactions ?? []).map(transaction => ({
                id: transaction.id,
                title: transaction.title,
                amount: Number(transaction.amount),
                type: 'CREDIT',
                status: 'COMPLETED',
                category: transaction.category,
                date: transaction.date,
                account: {
                    name: transaction.creditCard.name
                },
                installment: transaction.installment,
                totalInstallments: transaction.totalInstallments
            }))

        return [...transactions, ...creditTransactions]
    })

    const selectedAccount = ref('')
    const selectedType = ref('')
    const selectedCategory = ref('')

    function toggleFilter() {
        selectedAccount.value = "";
        selectedType.value = "";
        selectedCategory.value = "";
        filterVisible.value = !filterVisible.value;
    }

    const filteredTransactions = computed(() => {
        return allTransactions.value.filter(transaction => {
            const account =
                !selectedAccount.value ||
                transaction.account.name === selectedAccount.value

            const type =
                !selectedType.value ||
                transaction.type === selectedType.value

            const category =
                !selectedCategory.value ||
                transaction.category.toLowerCase() ===
                    selectedCategory.value.toLowerCase()

            return account && type && category
        })
    })

    const transactionsAggregated = computed(() => {
        return [...filteredTransactions.value]
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() -
                    new Date(b.date).getTime()
            )
            .reduce<Record<string, UnifiedTransaction[]>>((acc, transaction) => {
                const date = new Date(transaction.date)
                    .toISOString()
                    .split('T')[0]!

                if (!acc[date]) acc[date] = []

                acc[date].push(transaction)

                return acc
            }, {})
    })

    const showTransactionsModal = ref(false)
    const transactionsModalType = ref<'create' | 'edit'>('create')
    const transactionType = ref<'INCOME' | 'EXPENSE'>('INCOME')
    const transactionToEdit = ref<Transaction>()

    function openTransactionsModal(
        action: 'create' | 'edit',
        type: 'INCOME' | 'EXPENSE',
        transaction?: Transaction
    ) {

        if(transaction?.id.includes('projected')) return;

        transactionsModalType.value = action
        transactionType.value = type
        transactionToEdit.value = transaction
        showTransactionsModal.value = true
    }
</script>

<template>
    <section class="flex flex-col gap-6 bg-gradient-to-br from-surface to-card rounded-2xl p-2 md:p-5 border border-border">
        <div class="flex items-center justify-between text-foreground">
            <button 
                @click="transactionsBtnVisible = !transactionsBtnVisible" 
                class="md:w-56 px-4 py-2 flex items-center justify-center gap-1 hover:text-gray-300"
            >
                <Icon name="lucide:plus" class="w-6 h-6" /> <span class="hidden md:inline">Adicionar transação</span>
            </button>

            <MonthNavigator v-model="currentMonth" />

            <button 
                @click="toggleFilter" 
                class=" md:w-56 px-4 py-2 flex items-center justify-end hover:text-gray-300"
            >
                <Icon name="lucide:funnel" class="w-6 h-6" />
            </button>
        </div>

        <div v-if="transactionsBtnVisible">
            <button
                @click="openTransactionsModal('create', 'INCOME')"
                class="w-32 bg-success hover:bg-success-hover text-background rounded py-1 flex items-center justify-center gap-1 mb-3"
            >
                <Icon name="lucide:plus" class="w-4 h-4" />
                Receita
            </button>

            <button
                @click="openTransactionsModal('create', 'EXPENSE')"
                class="w-32 bg-error hover:bg-error/90 text-background rounded py-1 flex items-center justify-center gap-1"
            >
                <Icon name="lucide:minus" class="w-4 h-4" />
                Despesa
            </button>
        </div>

        <!-- Filter -->
        <div :class="[ filterVisible ? '' : 'hidden', 'flex items-center justify-between text-foreground bg-background rounded-full p-2 pr-5']">
            <div class="flex items-center gap-2">
                <div class="relative px-2 hidden md:flex justify-between items-center gap-2 w-40 rounded-full bg-surface">
                    <select v-model="selectedAccount" class="w-full p-2 cursor-pointer">
                        <option value="">Contas</option>
                        <option v-for="account in accounts" :value="account.name">
                            {{ account.name }}
                        </option>

                        <option v-for="card in cards" :value="card.id">
                            {{ card.name }}
                        </option>
                    </select>
                    <Icon name="lucide:chevron-down" class="w-6 h-6 absolute right-2 pointer-events-none" />
                </div>

                <div class="relative px-2 flex justify-between items-center gap-2 w-24 md:w-40 rounded-full bg-surface">
                    <select v-model="selectedType" class="w-full p-2 cursor-pointer">
                        <option value="">Tipo</option>
                        <option value="INCOME">Receita</option>
                        <option value="EXPENSE">Despesa</option>
                    </select>

                    <Icon name="lucide:chevron-down" class="w-6 h-6 absolute right-2 pointer-events-none" />
                </div>

                <div class="relative px-2 flex justify-between items-center gap-2 w-36 md:w-40 rounded-full bg-surface">
                    <select v-model="selectedCategory" class="w-full p-2 cursor-pointer">
                        <option value="">Categoria</option>
                        <option value="alimentacao" >Alimentação</option>
                        <option value="mercado" >Mercado</option>
                        <option value="moradia" >Moradia</option>
                        <option value="transporte" >Transporte</option>
                        <option value="saude" >Saúde</option>
                        <option value="educacao" >Educação</option>
                        <option value="investimentos" >Investimentos</option>
                        <option value="viagem" >Viagem</option>
                        <option value="entertenimento" >Entretenimento</option>
                        <option value="salario" >Salário</option>
                        <option value="freelance" >Freelance</option>
                        <option value="presente" >Presente</option>
                        <option value="outros" >Outros</option>
                    </select>

                    <Icon name="lucide:chevron-down" class="w-6 h-6 absolute right-2 pointer-events-none" />
                </div>
            </div>

            <button @click="toggleFilter"> <Icon name="lucide:x" class="w-6 h-6 mt-2" /> </button>

        </div>
    </section>

    <section class="bg-transparent md:bg-gradient-to-br from-surface to-card md:rounded-2xl p-2 md:p-5 md:border border-border">
        <TransactionsList
            :transactions="transactionsAggregated"
            @edit="({ transaction }) =>
                openTransactionsModal(
                    'edit',
                    transaction.type,
                    transaction
                )"
        />
        
        <BalanceSummary
        :initial-balance="report?.initialBalance ?? 0"
        :month-result="report?.monthlyBalance ?? 0"
        :final-balance="report?.resultBalance ?? 0"
        />
    </section>

    <BaseModal :modelValue="showTransactionsModal" @update:modelValue="showTransactionsModal = false">
        <TransactionForm 
            v-if="showTransactionsModal"
            :key="transactionType" :type="transactionType" 
            :type-form="transactionsModalType" 
            :transaction="transactionToEdit || undefined"
            @success="showTransactionsModal = false" 
        />
    </BaseModal>
</template>