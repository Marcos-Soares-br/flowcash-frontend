<script setup lang="ts">
    import ForgotPasswordForm from '~/components/forms/auth/ForgotPasswordForm.vue';

    definePageMeta({
        layout: 'auth',
        middleware: 'guest'
    });

</script>

<template>
    <ForgotPasswordForm />
</template>