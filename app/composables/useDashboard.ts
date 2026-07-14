export function useDashboard() {

    const accountStore = useAccountStore()

    const creditCardStore = useCreditCardStore()

    const transactionStore = useTransactionStore()

    const goalsStore = useGoalStore()

    async function load() {
        await Promise.all([
            accountStore.loadAccounts(),
            creditCardStore.loadCreditCards(),
            creditCardStore.getCurrentInvoices(),
            transactionStore.getDashboard(),
            goalsStore.getGoals()
        ])
    }

    return {
        load
    }
}