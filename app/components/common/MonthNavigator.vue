<script setup lang="ts">
    const model = defineModel<Date>({ required: true });

    const monthsName = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    const monthYearCurrent = computed(() => {
        return `${monthsName[model.value.getMonth()]} ${model.value.getFullYear()}`;
    });

    const previousMonth = () => {
        const date = new Date(model.value);
        date.setMonth(date.getMonth() - 1);
        model.value = date;
    };

    const nextMonth = () => {
        const date = new Date(model.value);
        date.setMonth(date.getMonth() + 1);
        model.value = date;
    };
</script>

<template>
    <div class="flex items-center gap-2 md:gap-6">
        <button
            type="button"
            @click="previousMonth"
            class="flex items-center justify-center"
        >
            <Icon name="lucide:chevron-left" class="w-8 h-8" />
        </button>

        <span class="font-semibold md:font-bold text-md md:text-lg md:w-40 text-center">
            {{ monthYearCurrent }}
        </span>

        <button
            type="button"
            @click="nextMonth"
            class="flex items-center justify-center"
        >
            <Icon name="lucide:chevron-right" class="w-8 h-8" />
        </button>
    </div>
</template>