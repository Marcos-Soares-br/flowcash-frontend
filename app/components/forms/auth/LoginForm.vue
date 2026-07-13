<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth';
    import type { AuthResponse } from '~/types/auth';

    const authStore = useAuthStore();
    
    const form = reactive({
        email: '',
        password: ''
    });
    
    const errorMessage = ref('');
    const loading = ref(false);
    const showPassword = ref(false);

    const togglePassword = () => showPassword.value = !showPassword.value;

    const submit = async () => {
        errorMessage.value = '';
        loading.value = true;
        
        try {
            await authStore.login(form) as AuthResponse;

            loading.value = false;
                
            await navigateTo('/');
        
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

    <form @submit.prevent="submit">
        <div class="mb-5">
            <label class="block text-sm font-semibold text-secondary mb-2">Email</label>
            <UiInput
                v-model="form.email" 
                type="email" 
                placeHolder="seu@email.com" :required="true"
            />
        </div>

        <div class="mb-5 relative">
            <div class="flex justify-between">
                <label class="block text-sm font-semibold text-secondary mb-2">Senha</label>
                <NuxtLink to="/auth/recuperar-senha" class="text-primary text-sm hover:text-primary-hover hover:underline">Esqueceu a senha?</NuxtLink>
            </div>
            <UiInput 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                placeHolder="sua senha" :required="true"
            />

            <Icon name="lucide:eye-closed" v-if="!showPassword" @click="togglePassword" class="absolute w-6 h-6 right-3 top-10 text-gray-400 cursor-pointer"/>
            <Icon name="lucide:eye" v-else @click="togglePassword" class="absolute w-6 h-6 right-3 top-10 text-gray-400 cursor-pointer"/>
        </div>

        <UiButton type="submit"> 
            <UiLoadSpinner v-if="loading"/>
            <span v-else>Entrar</span> 
        </UiButton>
    </form>          
</template>