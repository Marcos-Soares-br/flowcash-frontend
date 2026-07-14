<script setup lang="ts">
    import ExpenseByCategory from '~/components/charts/ExpenseByCategory.vue';
    import IncomesXExpenses from '~/components/charts/IncomesXExpenses.vue';
    import MonthNavigator from '~/components/common/MonthNavigator.vue';

    definePageMeta({
        middleware: 'auth'
    });

    const transactionStore = useTransactionStore();

    const currentMonth = ref(new Date());
    const monthToRequest = computed(() => {
        return currentMonth.value.toISOString().slice(0, 7);
    });

    watch(
        currentMonth,
        async (month) => {
            await transactionStore.getDailyCashFlow(month.toISOString().slice(0, 7)) ;
        },
        { immediate: true }
    );

    await transactionStore.getDailyCashFlow(monthToRequest.value);

    const categoriesHidden = ref(true);
    const isMobile = ref(false)

    onMounted(() => {
        isMobile.value = window.innerWidth < 768;
    });
</script>

<template>
    <section class="flex flex-col text-foreground gap-6 bg-gradient-to-br from-surface to-card rounded-2xl p-2 md:p-5 border border-border">
        <div class="flex justify-center items-center">
            <MonthNavigator v-model="currentMonth" />
        </div>

        <div class="hidden md:flex justify-center items-center gap-8">
            <button @click="categoriesHidden = true" :class="[categoriesHidden ? 'text-primary' : 'text-secondary', 'py-2 px-4']">
                <span :class="[categoriesHidden ? 'border-b': '', 'border-primary']">Receitas x Despesas</span>
            </button>
            
            <button @click="categoriesHidden = false" :class="[categoriesHidden ? 'text-secondary' : 'text-primary', 'py-2 px-4']">
                <span :class="[!categoriesHidden ? 'border-b': '', 'border-primary']">Categorias</span>
            </button>
        </div>
    </section>

    <section class="text-foreground bg-transparent md:bg-gradient-to-br from-surface to-card md:rounded-2xl p-2 md:p-5 md:border border-border">
        <ExpenseByCategory v-if="isMobile || !categoriesHidden" :monthToRequest="monthToRequest" />

        <IncomesXExpenses v-if="categoriesHidden" :monthToRequest="monthToRequest" />
    </section>
</template>