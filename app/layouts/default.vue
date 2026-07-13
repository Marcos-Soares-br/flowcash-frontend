<script setup lang="ts">
    import AppMenu from '~/components/layout/AppMenu.vue';
    import AppNav from '~/components/layout/AppNav.vue';

</script>

<template>
    <div class="h-full w-full flex flex-col min-h-0">
        <header class="px-3 md:px-24 pt-2 md:py-6 flex items-center justify-between">
            <p class="w-24 text-xl md:text-2xl text-foreground font-semibold">FlowCash</p>

            <AppNav />

            <AppMenu />
        </header>

        <main class="flex-1 overflow-y-auto px-3 md:px-24 pb-24 space-y-6">
            <slot></slot>
        </main>

    </div>
</template>