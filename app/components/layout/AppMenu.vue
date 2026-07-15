<script setup lang="ts">
    const { open } = useModal();

    const authStore = useAuthStore();
    const userStore = useUserStore();
    const menuHidden = ref(true);
    const menuRef = ref();

    function handleClickOutside(event: MouseEvent) {
        if (!menuRef.value) return;

        const target = event.target as Node;

        if (!menuRef.value.contains(target)) {
            menuHidden.value = true;
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });

    function toggleMenu() {
        menuHidden.value = !menuHidden.value;
    }

    async function logout() {
        await authStore.logout();
    }

    async function resetData() {
        if ( confirm('Isso vai apagar suas contas, cartões, transações e metas. tem certeza?') ) {
            await userStore.resetData();
        }
    }
</script>

<template>
    <div ref="menuRef" class="relative flex flex-col justify-center items-end w-24" style="z-index: 999;">
        <div class="flex gap-2">
            <button
                @click="toggleMenu()"
                class="w-10 h-10 rounded-full bg-surface flex items-center justify-center"
            >
                <Icon name="lucide:menu" class="w-5 h-5 text-secondary"/>
            </button>
        </div>

        <div :class="[menuHidden ? 'hidden' : '', 'w-48 py-3 absolute right-0 top-12 bg-surface rounded-xl border border-border shadow-2xl']">

            <p 
                @click="open('account', { typeForm: 'create' })"    
                class="w-full flex items-center gap-2 p-3 text-foreground text-left text-sm font-medium hover:bg-secondary-hover transition cursor-pointer"
            >
                <Icon name="lucide:landmark"/> Criar Conta
            </p>

            <p 
                @click="open('card', { typeForm: 'create' })"    
                class="w-full flex items-center gap-2 p-3 text-foreground text-left text-sm font-medium hover:bg-secondary-hover transition cursor-pointer"
            >
                <Icon name="lucide:credit-card"/> Criar Cartão
            </p>

            <p 
                @click="logout"    
                class="w-full flex items-center gap-2 p-3 text-foreground text-left text-sm font-medium hover:bg-secondary-hover transition cursor-pointer"
            >
                <Icon name="lucide:log-out"/> Logout
            </p>

            <p 
                @click="resetData"    
                class="w-full flex items-center gap-2 p-3 text-foreground text-left text-sm font-medium hover:bg-secondary-hover transition cursor-pointer"
            >
                <Icon name="lucide:refresh-cw"/> Resetar dados
            </p>

        </div>
    </div>

</template>