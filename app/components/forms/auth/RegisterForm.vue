<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth';

    const authStore = useAuthStore();
    
    const form = reactive({
        name: '',
        email: '',
        password: ''
    });

    const successMessage = ref('');
    const errorMessage = ref('');
    const loading = ref(false);
    const showPassword = ref(false);

    const togglePassword = () => showPassword.value = !showPassword.value;

    const submit = async () => {
        errorMessage.value = '';
        successMessage.value = '';
        
        if ( form.password.length < 6 ) {
            errorMessage.value = 'A senha deve ter pelo menos 6 caracteres';
            return;
        }

        loading.value = true;

        try {
            successMessage.value = await authStore.register(form);

            form.name = '';
            form.email = '';
            form.password = '';

            loading.value = false;

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
    <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage" />
    <UiAlert v-if="successMessage !== ''" type="success" :message="successMessage" />

    <form @submit.prevent="submit">
        <div class="mb-5">
            <label class="block text-sm font-semibold text-secondary mb-2">Nome Completo</label> 
            <UiInput 
                v-model="form.name" 
                placeHolder="seu nome" 
                :required="true"
            />
        </div>

        <div class="mb-5">
            <label class="block text-sm font-semibold text-secondary mb-2">Email</label> 
            <UiInput 
                v-model="form.email" 
                type="email"
                placeHolder="seu@email.com" 
                :required="true"
            />
        </div>

        <div class="mb-5 relative">
            <label class="block text-sm font-semibold text-secondary mb-2">Senha</label> 
            <UiInput 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'" 
                placeHolder="sua senha" 
                :required="true"
            />

            <Icon name="lucide:eye-closed" v-if="!showPassword" @click="togglePassword" class="absolute w-6 h-6 right-3 top-10 text-gray-400 cursor-pointer" />
            <Icon name="lucide:eye" v-else @click="togglePassword" class="absolute w-6 h-6 right-3 top-10 text-gray-400 cursor-pointer" />
        </div>

        <UiButton type="submit">
            <UiLoadSpinner v-if="loading"/>
            <span v-else>Criar Conta</span> 
        </UiButton>
    </form>
</template>