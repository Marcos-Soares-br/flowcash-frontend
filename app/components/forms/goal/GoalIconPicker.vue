<script setup lang="ts">
    import { getAllIcons } from '~/utils/getIcons';
    const emit = defineEmits(['update:selected']);

    const iconList = getAllIcons();
</script>

<template>
    <div 
        style="z-index: 99999;"
        class="flex flex-col rounded-3xl absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 bg-card p-6 w-full max-w-2xl h-full"
    >   
        <p class="text-foreground text-lg mx-auto mb-6">Clique para escolher um ícone</p>
        <div class="h-48 grid grid-cols-4 gap-5 mx-auto mb-auto">
            <div
                v-for="icon in iconList" :key="icon"
                @click="emit('update:selected', icon)"
                style="background-color: #00b8db; width: 70px; height: 70px"
                class=" flex rounded-full items-center justify-center cursor-pointer hover:scale-110 transition"
            >
                <Icon :name="icon" class="w-12 h-12 text-background/90" />
            </div>
        </div>

    </div>
</template>