<script setup lang="ts">
    const props = defineProps({
        modelValue: {
            type: [String, Number, Date],
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        placeHolder: String,
        required: Boolean
    });

    const emit = defineEmits<{
        (e: "update:modelValue", value: string | number): void
    }>();

    const onInput = (event: Event) => {
        const target = event.target as HTMLInputElement

        emit(
            "update:modelValue",
            props.type === "number"
            ? target.value === ""
                ? ""
                : target.valueAsNumber
            : target.value
        );
    }
</script>

<template>
    <input
        :type="type"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeHolder"
        :required="required"
        class="w-full bg-surface border border-border flex items-center justify-center py-3 px-4 gap-2 rounded-lg text-md text-foreground focus:ring-1 focus:ring-primary"
    />
</template>