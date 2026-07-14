<script setup lang="ts">
    import { getIcon } from '~/utils/getIcons';
    const props = defineProps<{ monthToRequest: string }>();

    const transactionStore = useTransactionStore();

    watch(
        () => props.monthToRequest,
        async (month) => {
            const [year, monthNumber] = month.split('-')

            await transactionStore.getCategories(year as string, monthNumber as string);
        },
        { immediate: true }
    );

    const categories = computed(() => transactionStore.categories);

    const series = computed(() =>
        categories.value.expense.map(item => item.amount)
    );

    const chartOptions = computed(() => ({
        labels: categories.value.expense.map(item => item.category),
        colors: [
            '#22C55E',
            '#3B82F6',
            '#F59E0B',
            '#EF4444'
        ],
        legend: {
            position: 'bottom'
        }
    }));
</script>

<template>
    <div class="p-6">
        <h2 class="mb-4 text-lg font-semibold">
            Gastos por categoria
        </h2>

        <ClientOnly class="w-[300px] mx-auto flex justify-center">
            <apexchart
                type="donut"
                height="320"
                :options="chartOptions"
                :series="series"
            />
        </ClientOnly>

        <div class="w-[300px] mx-auto flex flex-col text-secondary text-center">
            <div v-for="item in categories.expense" class="p-4 flex items-center gap-3">
                <Icon :name="getIcon(item.category) as string" class="w-8 h-8" />
                
                <p class="text-md text-foreground ">{{ item.category }}:</p>
                
                <p class="text-lg text-foreground font-inter font-semibold sensitive ml-auto">
                    {{ item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})  }}
                </p>
            </div>

            <p v-if="!categories.expense">Sem dados para o mês selecionado.</p>
        </div>
    </div>
    <div class="border-t border-border my-3 w-full"></div>
</template>