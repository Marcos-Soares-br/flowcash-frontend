<template>
    <div class="bg-card h-full w-full flex flex-col min-h-0">
        <header class="px-3 md:px-24 pt-2 md:py-6 flex items-center justify-between">
            <p class="w-24 text-xl md:text-2xl text-foreground font-semibold">FlowCash</p>

            <div>
                <NuxtLink to="/auth?mode=login" class="text-secondary text-md font-semibold hover:text-foreground">
                    Entrar
                </NuxtLink>
                <NuxtLink 
                    to="/auth?mode=register" 
                    class="py-2 px-3 rounded-lg bg-primary text-md font-semibold text-background hover:bg-primary-hover transition duration-300 ml-4"
                >
                    Cadastrar
                </NuxtLink>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto px-3 md:px-24 pb-24 space-y-8 text-foreground">
            <slot></slot>
        </main>

    </div>
</template>