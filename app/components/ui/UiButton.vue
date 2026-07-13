<script setup lang="ts">
    import type { PropType } from 'vue';

    const props = defineProps({ 
        type: {
            type: String as PropType<'button' | 'submit' | 'reset'>,
            default: "button"
        }
    });
</script>

<template>
    <button
        :type="type"
        class="w-full bg-primary flex items-center justify-center py-3 px-4 gap-2 rounded-lg text-md text-surface font-semibold transition-color duration-300 hover:bg-primary-hover"
    >
        <slot></slot>
    </button>
</template>