<script setup lang="ts">
defineProps<{
    initialBalance: number
    monthResult: number
    finalBalance: number
}>()
</script>

<template>
    <div
        class="bg-surface fixed left-0 w-full py-2 md:static mx-auto max-w-[800px] flex justify-between text-secondary text-center"
        style="bottom: 6.5rem; z-index: 1;"
    >
        <p class="w-48">Inicial:</p>
        <p class="w-48">Resultado:</p>
        <p class="w-48">Previsto:</p>
    </div>

    <div
        class="bg-surface fixed left-0 w-full pb-2 md:static mx-auto max-w-[800px] flex justify-between text-secondary text-center"
        style="bottom: 4.5rem; z-index: 1;"
    >
        <p class="w-48">
            {{ initialBalance.toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL'
            }) }}
        </p>

        <p class="w-48">
            {{ monthResult.toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL'
            }) }}
        </p>

        <p class="w-48">
            {{ finalBalance.toLocaleString('pt-BR', {
                style:'currency',
                currency:'BRL'
            }) }}
        </p>
    </div>
</template>