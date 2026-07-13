<script setup lang="ts">
    const authStore = useAuthStore();
    const email = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref<string | null>('');

    const submit = async () => {
        try {
            errorMessage.value = '';
            loading.value = true;

            successMessage.value = await authStore.forgotPassword(email.value);

        } catch (error: any) {
            loading.value = false;

            errorMessage.value =
                error.data?.message ??
                error.response?._data?.message ??
                error.message;
        }
    }
</script>

<template>
    <div class="bg-card flex flex-col gap-6 items-center justify-center text-foreground border border-border rounded-lg p-5 md:p-12 w-full max-w-md">
        <h1 class="text-lg font-bold mb-2">Recuperar Senha</h1>

        <UiAlert v-if="errorMessage" type="error" :message="errorMessage" />
        <UiAlert v-if="successMessage" type="success" :message="successMessage" />
        
        <form 
            v-if="!successMessage"
            @submit.prevent="submit" 
            class="space-y-4"
        >
            <p>Insira seu email para recuperar sua senha:</p>
            <UiInput 
                v-model="email" 
                placeHolder="Digite seu email" 
                type="email"
                :required="true" 
            />
            
            <UiButton type="submit">Enviar</UiButton>
        </form>

        <NuxtLink 
            v-if="successMessage"
            to="/auth?mode=login"
            class="text-primary font-semibold transition-color duration-300 hover:text-primary-hover"
        >
            Ir para Login
        </NuxtLink>

    </div>
</template>