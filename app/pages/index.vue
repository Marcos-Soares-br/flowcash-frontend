<script setup lang="ts">
    definePageMeta({
        layout: 'landing-page'
    })
</script>

<template>
    <section class="grid md:grid-cols-2 items-center gap-6 md:gap-0">
        <div class="flex md:order-2">
            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img 
                    src="../assets/images/flowcash-home-desktop.png" 
                    alt="foto do dashboard do app"
                    class="rounded-lg"
                >
            </div>
        </div>

        <div class="flex flex-col items-center md:block text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-semibold">
                Controle suas finanças,<br>
                <span class="text-primary">em um só lugar</span>
            </h1>

            <p class="text-secondary text-md my-8">
                Cadastre suas contas, cartões, receitas e despesas<br>
                e deixe resto com o FlowCash.
            </p>
            
            <UiButton style="width: 200px;">
                Criar Conta
            </UiButton>
        </div>

    </section>

    <section class="grid md:grid-cols-2 items-center gap-6">
        <div class="gap-4 flex justify-center md:justify-start">
            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img
                    src="../assets/images/flowcash-transacoes-mobile.webp"
                    alt="foto do dashboard do app"
                    class="h-72 md:h-96 rounded-lg"
                >
            </div>

            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img
                    src="../assets/images/flowcash-relatorios-mobile.webp"
                    alt="foto do dashboard do app"
                    class="h-72 md:h-96 rounded-lg"
                >
            </div>
        </div>

        <div class="flex flex-col items-center text-center md:text-left">
            <h2 class="text-2xl md:text-3xl font-semibold">
                Acompanhe o caminho de<br> cada centavo seu!
            </h2>

            <p class="text-secondary text-md mt-2">
                Cadastrando suas receitas e despesas, nós<br> montamos seu histórico de transações e relatórios.
            </p>
        </div>
    </section>

    <section>
        <h2 class="text-2xl md:text-3xl text-center font-semibold mb-12">
            Nossos Recursos
        </h2>

        <div class="grid md:grid-cols-3 gap-4 md:gap-0 text-center md:text-left">

            <div class="flex flex-col gap-8 items-center md:items-start">
                <div class="flex flex-col items-center md:items-start">
                    <Icon name="lucide:landmark" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-xl md:text-2xl my-2">
                        Controle suas contas
                    </h3>
                    <p class="text-secondary">
                        Gerencie todas suas contas em um único lugar.
                    </p>
                </div>
                <div class="flex flex-col items-center md:items-start">
                    <Icon name="lucide:credit-card" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-xl md:text-2xl my-2">
                        Controle seus cartões
                    </h3>
                    <p class="text-secondary">
                        Gerencie todas seus cartões em um único lugar.
                    </p>
                </div>
            </div>

            <div class="hidden md:flex justify-center">
                <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                    <img
                        src="../assets/images/flowcash-dashboard-mobile.webp"
                        alt="foto do dashboard do app"
                        class="h-[450px] rounded-lg"
                    >
                </div>
            </div>

            <div class="flex flex-col gap-8 items-center md:items-start">
                <div class="flex flex-col items-center md:items-start">
                    <Icon name="lucide:bar-chart-3" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-xl md:text-2xl my-2">
                        Relatórios
                    </h3>
                    <p class="text-secondary">
                        Veja relatórios com gráficos.
                    </p>
                </div>
                <div class="flex flex-col items-center md:items-start">
                    <Icon name="lucide:target" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-xl md:text-2xl my-2">
                        Metas
                    </h3>
                    <p class="text-secondary">
                        Crie e gerencie metas financeiras,<br> (não são vinculadas ao saldo das contas).
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>