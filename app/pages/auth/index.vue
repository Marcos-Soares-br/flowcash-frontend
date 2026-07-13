<script setup lang="ts">
    import LoginForm from '~/components/forms/auth/LoginForm.vue';
    import RegisterForm from '~/components/forms/auth/RegisterForm.vue';

    definePageMeta({
        layout: 'auth',
        middleware: 'guest'
    });

    type AuthMode = 'login' | 'register';

    const route = useRoute();

    const mode = computed<AuthMode>(() => {
        return route.query.mode === 'register'
            ? 'register'
            : 'login';
    });

    const isLogin = computed(() => mode.value === 'login');

    const content = computed(() => {
        return isLogin.value
            ? {
                title: 'Entrar',
                subtitle: 'Acesse sua conta de controle financeiro',
                spanText: 'Não tem uma conta?',
                btnText: 'Registre-se'
            }
            : {
                title: 'Criar Conta',
                subtitle: 'Comece a controlar suas finanças',
                spanText: 'Já tem uma conta?',
                btnText: 'Faça login'
            };
    });

    function toggleForm() {
        navigateTo({
            path: '/auth',
            query: {
                mode: isLogin.value ? 'register' : 'login'
            },
            replace: true
        });
    }
</script>

<template>
    <div class="bg-card border border-border rounded-lg p-5 md:p-12 w-full max-w-md fade-in">
        <div class="text-center mb-8">
            <Icon name="lucide:trending-up" class="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 class="font-bold text-[28px] mb-2 text-foreground">{{ content.title }}</h1>
            <p class="text-gray-400 text-sm">{{ content.subtitle }}</p>
        </div>

        <LoginForm v-if="mode === 'login'" />

        <RegisterForm v-else-if="mode === 'register'" />

        <div class="text-center mt-8 text-sm text-gray-400 flex gap-2 justify-center">
            <span>{{ content.spanText }}</span> 
            <button 
                type="button"  class="text-primary font-semibold transition-color duration-300 hover:text-primary-hover"
                @click="toggleForm" 
            >
                {{ content.btnText }}
            </button>
        </div>
    </div>
</template>