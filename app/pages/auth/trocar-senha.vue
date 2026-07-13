<script setup lang="ts">
    import ResetPasswordForm from '~/components/forms/auth/ResetPasswordForm.vue';

    definePageMeta({
        layout: 'auth',
        middleware: 'guest'
    });
</script>

<template>
    <ResetPasswordForm />
</template>