<script setup lang="ts">
    const route = useRoute();

    const nav = computed(() => [
        {
            name: 'Home',
            to: '/dashboard',
            icon: 'home',
            active: route.path === '/dashboard'
        },
        {
            name: 'Transações',
            to: '/transacoes',
            icon: 'arrow-left-right',
            active: route.path === '/transacoes'
        },
        {
            name: 'Relatórios',
            to: '/relatorios',
            icon: 'bar-chart-3',
            active: route.path === '/relatorios'
        },
        {
            name: 'Metas',
            to: '/metas',
            icon: 'target',
            active: route.path === '/metas'
        }
    ]);

</script>

<template>
    <nav class="hidden md:flex items-center justify-center gap-12 w-full">
        <NuxtLink 
            v-for="item in nav" :key="item.to" :to="item.to"
            :class="['flex flex-col items-center gap-1 py-2', item.active ? 'text-primary' : 'text-secondary hover:text-secondary-hover transition']"
        >
            {{ item.name }}
        </NuxtLink>
    </nav>

    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-border px-8 py-2" style="z-index: 5;">
        <div class="flex items-center justify-between">
            <NuxtLink 
                v-for="item in nav" :key="item.to" :to="item.to"
                :class="['flex flex-col items-center gap-1 py-2', item.active ? 'text-primary' : 'text-secondary hover:text-secondary-hover transition']"
            >
                <Icon :name="`lucide:${item.icon}`" class="w-5 h-5"/>
                <span class="text-[10px] font-medium">{{ item.name }}</span>
            </NuxtLink>
        </div>
    </nav>
</template>