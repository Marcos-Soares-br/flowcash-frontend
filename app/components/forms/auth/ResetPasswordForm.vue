<script setup lang="ts">
    const authStore = useAuthStore();
    const route = useRoute();

    const loading = ref(false);
    const token = route.query.token as string;
    const newPassword = ref('');

    const errorMessage = ref('');
    const successMessage = ref<string | null>('');

    const submit = async () => {
        try {
            errorMessage.value = '';
            loading.value = true;

            successMessage.value = await authStore.resetPassword(
                token, 
                newPassword.value
            );

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
        <h1 class="text-lg font-bold mb-2">Definir Nova Senha</h1>

        <UiAlert v-if="errorMessage" type="error" :message="errorMessage" />
        <UiAlert v-if="successMessage" type="success" :message="successMessage" />
        
        <form 
            v-if="!successMessage"
            @submit.prevent="submit" 
            class="space-y-4"
        >
            <UiInput 
                v-model="newPassword" 
                placeHolder="Digite sua nova senha" 
                type="text"
                :required="true" 
            />
            
            <UiButton type="submit">Enviar</UiButton>
        </form>

        <NuxtLink 
            v-if="successMessage"
            to="/auth?mode=login" 
            class="bg-primary py-3 px-4 -mt-4 rounded-lg text-md text-background font-semibold hover:bg-primary-hover transition duration-300"
        >
            Ir para o Login
        </NuxtLink>

    </div>
</template>