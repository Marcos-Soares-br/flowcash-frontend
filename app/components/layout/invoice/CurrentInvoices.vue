<script setup lang="ts">
    const creditCardStore = useCreditCardStore();
    creditCardStore.getCurrentInvoices()

    const cards = computed(() => creditCardStore.creditCards);
    const invoices = computed( () => creditCardStore.currentInvoices);

    const findCard = (id: string) => cards.value.find(card => card.id === id);

</script>

<template>
    <div class="bg-card w-full h-full flex flex-col md:pt-16 p-4 items-center gap-2 text-foreground overflow-y-auto">
        
        <div class="mb-6 flex items-center justify-center gap-2">
            <Icon name="lucide:credit-card" class="w-6 h-6" />
            <span class="text-2xl font-bold">Faturas Atuais</span>
        </div>

        <span v-if="invoices.length === 0" class="font-semibold text-foreground">Nenhuma fatura encontrada.</span>

        <div
            v-for="invoice in invoices"
            class="bg-background w-full max-w-2xl p-4 md:p-8 border border-border rounded-2xl flex flex-col"
        >
            <p class="text-md font-semibold">
                {{ findCard(invoice.creditCardId)!.name }}
            </p>

            <div>
                <p class="text-secondary">
                    Fecha: {{ new Date(invoice.endDate).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit'}) }} 
                    - 
                    Vence: {{ new Date(invoice.dueDate).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit'}) }}
                </p>
            </div>

            <div class="bg-surface rounded-2xl p-2 px-4 flex justify-between mt-4">

                <div class="flex flex-col items-center">
                    <p>Disponível:</p>
                    <p class="font-bold text-xl md:text-2xl text-success">
                        {{ useCreditCardStore().getAvaliableLimit(invoice.creditCardId).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}
                    </p>
                </div>

                <div class="flex flex-col items-center">
                    <p>A pagar:</p>
                    <p class="font-bold text-xl md:text-2xl text-error">
                        {{ invoice.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}
                    </p>
                </div>

            </div>

            <div>
                <p class="text-sm mt-4">
                    <span class="font-semibold">Transações:</span> 
                </p>

                    <div
                        v-for="transaction in invoice.transactions" :key="transaction.id"
                        class="flex justify-between items-center gap-4 border-b border-border py-4"
                    > 
                        <div class="flex items-center gap-2">
                            <div class="bg-primary/80 flex w-10 md:w-12 h-10 md:h-12 rounded-full">
                                <Icon :name="getIcon(transaction.category)!" class="m-auto w-6 h-6 text-background" />
                            </div>
                            <p class="text-sm font-semibold">
                                {{ transaction.title }}
                            </p>
                        </div>

                        <p class="text-primary text-base font-semibold sensitive text-right ml-auto mr-2">
                            {{
                                transaction.amount.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                            }}
                        </p>
                    </div>
                </div>
            </div>
    </div>
</template>