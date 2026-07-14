<script setup lang="ts">
    const props = defineProps<{ monthToRequest: string }>();

    const transactionStore = useTransactionStore();

    const dailyCashFlow = computed( () => 
        transactionStore.getDailyCashFlowByMonth(props.monthToRequest)
    );

    const report = ref({
        monthIncomes: 0,
        monthExpenses: 0,
        resultBalance: 0
    });

    const series = computed(() => [
        {
            data: [
                report.value.monthIncomes,
                report.value.monthExpenses,
            ],
        },
    ]);

    watch(
        () => props.monthToRequest,
        async (month) => {
            report.value = await transactionStore.getReport(month)
        },
        { immediate: true }
    );

    const chartOptions = {
        chart: {
            toolbar: { show: false }
        },
        xaxis: {
            categories: ['Receitas', 'Despesas']
        },
        colors: ['#22C55E', '#EF4444'],
        plotOptions: {
            bar: {
            distributed: true,
            borderRadius: 6
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#E5E7EB'
        }
    }
</script>

<template>
    <div class="md:p-6">
        <h2 class="mb-4 text-lg font-semibold">
            Receitas x Despesas
        </h2>

        <div class="w-[300px] mx-auto flex justify-center">
            <apexchart type="bar" height="320" :options="chartOptions" :series="series"></apexchart>
        </div>
        
        <div class="md:hidden flex justify-between text-secondary text-center">
            <p class="w-48">Receitas:</p>
            <p class="w-48">Despesas:</p>
            <p class="w-48">Saldo Previsto:</p>
        </div>
        <div class="md:hidden flex justify-between text-secondary text-center">
            <p class="w-48 text-success">{{ report.monthIncomes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</p>
            <p class="w-48 text-error">{{ report.monthExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</p>
            <p class="w-48 text-success">{{ report.resultBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}</p>
        </div>
    </div>
    <div class="border-t border-border my-3 w-full"></div>
    <table class="hidden md:table w-full mt-5 table-fixed">

        <thead class="border-b border-border border-separate border-spacing-y-3">
            <tr class="text-secondary">
                <th class="text-left py-3 w-1/5">Período</th>
                <th class="text-center w-1/5">Receitas</th>
                <th class="text-center w-1/5">Despesas</th>
                <th class="text-center w-1/5">Resultado</th>
                <th class="text-right w-1/5">Saldo</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in dailyCashFlow" :key="item.date" class="border-b border-border">
                <td class="text-left py-3">{{ item.date }}</td>
                <td class="text-center text-success">{{ item.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td class="text-center text-error">{{ item.expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td class="text-center text-success">{{ item.result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td class="text-right text-success">{{ item.balanceDay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
            </tr>

            <tr v-if="dailyCashFlow!.length == 0" class="border-b border-border">
                <td class="text-left py-3">---</td>
                <td class="text-center text-success">R$ 0,00</td>
                <td class="text-center text-error">R$ 0,00</td>
                <td class="text-center text-success">R$ 0,00</td>
                <td class="text-right text-success">R$ 0,00</td>
            </tr>
        </tbody>
    </table>
</template>