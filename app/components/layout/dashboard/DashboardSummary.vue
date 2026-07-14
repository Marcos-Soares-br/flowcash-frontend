<script setup lang="ts">
    const props = defineProps({
        totalBalance: { type: Number, default: 0 },
        monthlyIncome: { type: Number, default: 0 },
        monthlyExpense: { type: Number, default: 0 },
        variation: { type: Number, default: 0 },
        valuesHidden: { type: Boolean, default: false },
    });

    const emit = defineEmits(['valuesHidden']);

    const authStore = useAuthStore();
    const creditCardStore = useCreditCardStore();

    const invoices = computed(() => creditCardStore.currentInvoices);

    const { open } = useModal();
</script>

<template>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-b from-surface to-card rounded-2xl p-5 border border-border">
        <div class="order-2 md:order-1">
            <div class="hidden md:flex mb-3">
                <h1 class="text-lg text-foreground font-bold"><span class="text-secondary font-medium">Olá,</span> {{ authStore.userName }}</h1>
            </div>
            <div class="grid grid-cols-2 gap-3 font-inter">
                <div class="bg-background/50 rounded-xl p-3 flex flex-col items-center">
                    <p class="text-sm text-gray-400 mb-1">Receita mensal</p>
                    <p :class="[valuesHidden  ? 'blur user-select-none': '', 'text-md font-bold text-success sensitive']">
                        {{ monthlyIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                </div>
                <div class="bg-background/50 rounded-xl p-3 flex flex-col items-center">
                    <p class="text-sm font-inter text-gray-400 mb-1">Despesa mensal</p>
                    <p :class="[valuesHidden  ? 'blur user-select-none': '', 'text-md font-bold text-error sensitive']">
                        {{ monthlyExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                </div>
            </div>
        </div>

        <div class="order-1 md:order-2 flex flex-col md:items-center justify-center md:border-x border-border">
            <span class="text-md text-secondary mb-2">Saldo total</span> 
            
            <div class="flex items-start md:items-center justify-between gap-4">
                <p :class="[valuesHidden  ? 'blur user-select-none': '', 'text-2xl text-foreground font-extrabold sensitive mb-1']">
                    {{ totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </p>
                <button @click="emit('valuesHidden', !valuesHidden)" class="text-foreground"><Icon name="lucide:eye" class="w-8 h-8" /></button>
            </div>
            
            <div>
                <div v-if="variation > 0"  class="flex items-center gap-1 md:mb-5">
                    <Icon name="lucide:trending-up" class="w-4 h-4 text-success" /> <span :class="[valuesHidden  ? 'blur user-select-none': '', 'text-sm text-success font-medium']">{{ variation }}%</span>
                </div>
                <div  v-else-if="variation < 0"class="flex items-center gap-1 md:mb-5">
                    <Icon name="lucide:trending-down" class=" w-4 h-4 text-error" /> <span :class="[valuesHidden  ? 'blur user-select-none': '', 'text-sm text-error font-medium']">{{ variation }}%</span>
                </div>
                <div v-else class="flex items-center gap-1 md:mb-5">
                    <span :class="[valuesHidden  ? 'blur user-select-none': '', 'text-sm text-secondary font-medium']">{{ variation }}%</span>
                </div>
            </div>
        </div>

        <div class="order-3 md:order-3">
            <h2 class="text-md  md:text-center text-secondary mb-3">Ações rápidas</h2>
            <div class="grid grid-cols-4 gap-3 h-20">
                <button 
                    @click="open('transaction', { typeForm: 'create', type: 'INCOME' })" 
                    class="flex flex-col items-center gap-2 bg-background/50 rounded-xl p-2 hover:bg-background transition"
                >
                    <div class="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <Icon name="lucide:arrow-down-left" class="w-5 h-5 text-success" />
                    </div>
                    <span class="text-xs text-secondary">Receita</span>
                </button>
                <button 
                    @click="open('transaction', { typeForm: 'create', type: 'EXPENSE'})"
                    class="flex flex-col items-center gap-2 bg-background/50 rounded-xl p-2 hover:bg-background transition"
                >
                    <div class="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                        <Icon name="lucide:arrow-up-right" class="w-5 h-5 text-error" />
                    </div>
                    <span class="text-xs text-secondary">Despesa</span>
                </button>
                <button 
                    @click="open('transfer', {})"
                    class="flex flex-col items-center gap-2 bg-background/50 rounded-xl p-2 hover:bg-background transition"
                >
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="lucide:repeat" class="w-5 h-5 text-primary" />
                    </div>
                    <span class="text-xs text-secondary">Transferir</span>
                </button>
                <button 
                    @click="open('invoices', { invoices })"
                    class="flex flex-col items-center gap-2 bg-background/50 rounded-xl p-2 hover:bg-background transition"
                >
                    <div class="w-10 h-10 rounded-full bg-purple-400/10 flex items-center justify-center">
                        <Icon name="lucide:credit-card" class="w-5 h-5 text-purple-400" />
                    </div>
                    <span class="text-xs text-secondary">Fatura</span>
                </button>
            </div>
        </div>

    </section>    
</template>