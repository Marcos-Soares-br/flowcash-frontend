<script setup lang="ts">
    interface Props {
        modelValue: boolean
    }

    const props = defineProps<Props>();

    const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

    function close() {
        emit('update:modelValue', false)
    }

</script>

<template>
    <Teleport to="body">
        <div 
            @click.self="close()" 
            :class="[props.modelValue ? '' : 'hidden', 'fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur']"
            style="z-index: 9990;"
        >
            <Icon name="lucide:x" class="absolute w-8 h-8 text-foreground top-5 right-5 cursor-pointer" @click="close()" />
            <slot style="z-index: 9999;"></slot>
        </div>
    </Teleport>
</template>