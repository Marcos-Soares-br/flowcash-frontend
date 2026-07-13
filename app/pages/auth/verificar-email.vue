<script setup lang="ts">
    definePageMeta({
        layout: 'auth',
        middleware: 'guest'
    });

    const authStore = useAuthStore();
    const route = useRoute();

    const token = route.query.token as string;
    const message = ref<string | null>('');

    onMounted(async () => {
        if (token) {
            message.value = await authStore.verifyEmail(token);
        }
    });
</script>

<template>
    <div class="bg-card flex flex-col gap-8 items-center justify-center text-foreground border border-border rounded-lg p-5 md:p-12 w-full max-w-md">
        <h1 class="text-lg font-bold">Confirmação de Email</h1>

        <p v-if="!message"> Verificando seu email... </p>

        <UiAlert v-if="message" type="success" :message="message" />

        <NuxtLink 
            v-if="message"
            to="/auth?mode=login" 
            class="bg-primary py-3 px-4 rounded-lg text-md text-background font-semibold hover:bg-primary-hover transition duration-300"
        >
            Ir para o Login
        </NuxtLink>
    </div>
    
</template>