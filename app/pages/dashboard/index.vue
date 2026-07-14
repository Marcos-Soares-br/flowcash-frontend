<script setup lang="ts">
    import { useDashboard } from "~/composables/useDashboard";
    import AccountsList from "~/components/layout/account/AccountsList.vue";
    import CreditCardsList from "~/components/layout/credit-card/CreditCardsList.vue";
    import GoalsList from "~/components/common/GoalsList.vue";
    import NearbyTransactions from "~/components/layout/transaction/NearbyTransactions.vue";
    import DashboardModals from "~/components/layout/dashboard/DashboardModals.vue";
    import PendingTransactions from "~/components/layout/transaction/PendingTransactions.vue";
    import DashboardSummary from "~/components/layout/dashboard/DashboardSummary.vue";


    definePageMeta({
        middleware: 'auth'
    });

    const { load } = useDashboard();
    await load();

    const transactionStore = useTransactionStore();
    const goalsStore = useGoalStore();

    const pendingTransactions = computed(() => transactionStore.dashboard.overdueTransactions);
    const nearbyTransactions = computed(() => transactionStore.dashboard.upcomingTransactions);
    const goals = computed(() => goalsStore.goals);

    const valuesHidden  = ref(false);
    const totalBalance = computed(() => transactionStore.dashboard.totalBalance);
    const monthlyExpense = computed(() => transactionStore.dashboard.monthlyExpense);
    const monthlyIncome = computed(() => transactionStore.dashboard.monthlyIncome);
    const variation = computed( () => transactionStore.dashboard.variation);


</script>

<template>
    <DashboardSummary
        :total-balance="totalBalance"
        :monthly-expense="monthlyExpense"
        :monthly-income="monthlyIncome"
        :variation="variation"
        :values-hidden="valuesHidden"

        @values-hidden="valuesHidden= $event"
    />

    <section v-if="pendingTransactions.length > 0">
        <PendingTransactions :pending-transactions="pendingTransactions" :values-hidden="valuesHidden" />
    </section>

    <section class="grid md:grid-cols-2 gap-6">
        <AccountsList :values-hidden="valuesHidden" />

        <CreditCardsList :values-hidden="valuesHidden" />
    </section>

    <section class="grid md:grid-cols-2 gap-6">
        <NearbyTransactions :nearby-transactions="nearbyTransactions" :values-hidden="valuesHidden" />

        <GoalsList :goals="goals" from="dashboard" :values-hidden="valuesHidden" />
    </section>

    <DashboardModals />
</template>