<script setup lang="ts">
    const creditCardStore = useCreditCardStore();
    const creditCards = computed(() => creditCardStore.creditCards);
    const invoices = computed(() => creditCardStore.currentInvoices);

    const props = defineProps({
        valuesHidden: {
            type: Boolean,
            default: false
        }
    });

    function getInvoiceByCard(creditCardId: string) {
        const cardInvoice = invoices.value.find(
            invoice => invoice?.creditCardId === creditCardId
        );

        return cardInvoice || { amount: 0 };

    }

    const { open } = useModal();

</script>

<template>
    <div class="flex flex-col">
        <h2 class="text-md font-semibold text-secondary mb-3">Cartões</h2>
        <div class="space-y-2">

            <p v-if="creditCards.length === 0" class="text-sm text-secondary">
                Use o menu superior direito para adicionar um cartão.
            </p>

            <div 
                v-for="card in creditCards"
                @click="open('card', { typeForm: 'edit', card })"
                class="rounded-xl p-4 border cursor-pointer hover:opacity-90 transition"
                :style="{
                    backgroundImage: `linear-gradient(to right, ${card.color}80, #0F172A)`,
                    borderColor: `${card.color}`
                }"
            >
                <div class="flex items-center justify-between mb-3">
                    <p class="text-md text-foreground font-semibold">{{ card.name }}</p>
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-secondary">
                            Fecha {{ card.closingDay.toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) }} · Vence {{ card.dueDay.toLocaleString('pt-BR', { minimumIntegerDigits: 2 }) }}
                        </span>
                    </div>
                </div>
                <div class="mb-2">
                    <div class="flex justify-between text-xs text-secondary mb-1">
                        <span :class="[valuesHidden  ? 'blur user-select-none': '', 'sensitive']">
                            {{ getInvoiceByCard(card.id).amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }} usado
                        </span> 
                        <span :class="[valuesHidden  ? 'blur user-select-none': '', 'sensitive']">
                            {{ card.limit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) }}
                        </span>
                    </div>
                    <div class="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div 
                            class="h-full" 
                            :style="`width:${getInvoiceByCard(card.id).amount / card.limit * 100}%; background-color: ${card.color}`"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>