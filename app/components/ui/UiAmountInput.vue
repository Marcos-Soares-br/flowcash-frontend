<script setup lang="ts">
type Colors = 'primary' | 'success' | 'error';

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    color: {
        type: String as PropType<Colors>,
        default: "primary"
    },
    required: Boolean
});

const emit = defineEmits<{
    (e: "update:modelValue", value: number): void;
}>();

const formattedValue = computed(() => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(props.modelValue);
});

function onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const digits = input.value.replace(/\D/g, "");

    const value = Number(digits) / 100;

    emit("update:modelValue", value);

    input.value = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(value);
}
</script>

<template>
    <input
        type="text"
        inputmode="numeric"
        :value="formattedValue"
        @input="onInput"
        :required="required"
        :class="[
            'w-full bg-surface rounded-lg border border-border flex items-center justify-center py-3 px-4 text-center font-semibold text-3xl',
            {
                'text-primary': color === 'primary',
                'text-success': color === 'success',
                'text-error': color === 'error'
            }
        ]"
    />
</template>