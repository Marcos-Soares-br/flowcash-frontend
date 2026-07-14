<script setup lang="ts">

    const emit = defineEmits(['update:selected']);

    const colorList = ['#2b7fff', '#00b8db', '#00c950', '#fb2c36', '#f0b100', '#ff6900', '#8e51ff', '#f6339a', '#ff2056' ];
</script>

<template>
    <div 
        style="z-index: 99999;"
        class="flex flex-col rounded-3xl absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 bg-card p-6 w-full max-w-2xl h-full"
    >   
        <p class="text-foreground mx-auto mb-6 mt-auto">Clique para escolher uma cor</p>
        <div class="h-48 grid grid-cols-3 gap-5 mx-auto mb-auto">
            <div
                v-for="color in colorList" :key="color"
                @click="emit('update:selected', color)"
                :style="[ 'background-color: ' + color, 'width: 50px; height: 50px']"
                class=" flex rounded-full cursor-pointer hover:scale-110 transition"
            >
            </div>
        </div>

    </div>
</template>