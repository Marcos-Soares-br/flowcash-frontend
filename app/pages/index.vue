<script setup lang="ts">
    definePageMeta({
        layout: 'landing-page'
    })
</script>

<template>
    <section class="grid grid-cols-2 items-center">
        <div>
            <h1 class="text-4xl font-semibold">
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

        <div>
            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img 
                    src="../assets/images/flowcash-home-desktop.png" 
                    alt="foto do dashboard do app"
                    class="rounded-lg"
                >
            </div>
        </div>
    </section>

    <section class="grid grid-cols-2 items-center gap-6">
        <div class="flex gap-4">
            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img
                    src="../assets/images/flowcash-transacoes-mobile.webp"
                    alt="foto do dashboard do app"
                    class="h-96 rounded-lg"
                >
            </div>

            <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                <img
                    src="../assets/images/flowcash-relatorios-mobile.webp"
                    alt="foto do dashboard do app"
                    class="h-96 rounded-lg"
                >
            </div>
        </div>

        <div>
            <h2 class="text-3xl font-semibold">
                Acompanhe o caminho de<br> cada centavo seu!
            </h2>

            <p class="text-secondary text-md mt-2">
                Cadastrando suas receitas e despesas, nós<br> montamos seu histórico de transações e relatórios.
            </p>
        </div>
    </section>

    <section>
        <h2 class="text-3xl text-center font-semibold mb-12">
            Nossos Recursos
        </h2>

        <div class="grid grid-cols-3">
            <div class="flex flex-col gap-8">
                <div>
                    <Icon name="lucide:landmark" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-2xl my-2">
                        Controle suas contas
                    </h3>
                    <p class="text-secondary">
                        Gerencie todas suas contas em um único lugar.
                    </p>
                </div>
                <div>
                    <Icon name="lucide:credit-card" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-2xl my-2">
                        Controle seus cartões
                    </h3>
                    <p class="text-secondary">
                        Gerencie todas seus cartões em um único lugar.
                    </p>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="rounded-2xl bg-border/80 p-2 shadow-2xl shadow-primary/10">
                    <img
                        src="../assets/images/flowcash-dashboard-mobile.webp"
                        alt="foto do dashboard do app"
                        class="h-[450px] rounded-lg"
                    >
                </div>
            </div>

            <div class="flex flex-col gap-8">
                <div>
                    <Icon name="lucide:bar-chart-3" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-2xl my-2">
                        Relatórios
                    </h3>
                    <p class="text-secondary">
                        Veja relatórios com gráficos.
                    </p>
                </div>
                <div>
                    <Icon name="lucide:target" class="w-8 h-8 text-primary" />
                    <h3 class="font-semibold text-2xl my-2">
                        Metas
                    </h3>
                    <p class="text-secondary">
                        Crie e gerencie metas financeiras, (não são vinculadas ao saldo das contas).
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>