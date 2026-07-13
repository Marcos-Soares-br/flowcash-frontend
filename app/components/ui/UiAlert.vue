<script setup lang="ts">
    const props = defineProps({ 
        type: String,
        message: String 
    });
</script>

<template>
    <div :class="[props.type === 'success' ? 'bg-success/10 border-success text-success-content' : 'bg-error/10 border-error text-error-content', 'border text-center p-4 rounded-md mb-8']">
        {{ message }}
    </div>
</template>
