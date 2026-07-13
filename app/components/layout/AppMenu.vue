<script setup lang="ts">
    const authStore = useAuthStore();
    const menuHidden = ref(true);

    function toggleMenu() {
        menuHidden.value = !menuHidden.value;
    }

    async function logout() {
        await authStore.logout();
    }

</script>

<template>
    <div class="relative flex flex-col justify-center items-end w-24" style="z-index: 999;">
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
                @click="logout"    
                class="w-full flex items-center gap-2 p-3 text-foreground text-left text-sm font-medium hover:bg-secondary-hover transition cursor-pointer"
            >
                <Icon name="lucide:log-out"/> Logout
            </p>

        </div>
    </div>

</template>