<script setup lang="ts">
    import type {  CreditCardRequest } from "~/types/credit-card";
    import CardColorPicker from "./CardColorPicker.vue";

    const creditCardStore = useCreditCardStore();

    const emit = defineEmits(['success']);
    const props = defineProps({ 
        typeForm: {
            type: String,
            default: "create",
        },
        card: {
            type: Object,
            default: {
                id: '',
                name: 'Cartão',
                color: '#2b7fff',
                limit: 0,
                closingDay: 1,
                dueDay: 3
            },
        }
    });

    const form = reactive({
        name: props.card.name,
        color: props.card.color,
        limit: props.card.limit,
        closingDay: props.card.closingDay,
        dueDay: props.card.dueDay
    }) as CreditCardRequest;

    const loading = ref(false);
    const errorMessage = ref('');

    async function submit() {
        loading.value = true;
        errorMessage.value = '';

        try {
            if (props.typeForm === "edit") {
                await creditCardStore.updateCreditCard(props.card.id, form as CreditCardRequest);
    
            } else {
                await creditCardStore.createCreditCard(form as CreditCardRequest);
            }

            emit("success");

        } catch (error: any) {
            errorMessage.value =
                error.data?.message ??
                error.response?._data?.message ??
                error.message;
                
        } finally {
            loading.value = false;
        }
    }

    const colorPicker = ref(false);
    function setColor(color: string) {
        colorPicker.value = false;
        form.color = color;
    }

    async function deleteCard(id: string) {
        if (!confirm('Tem certeza que deseja excluir esse cartão?')) return;

        try {
            await creditCardStore.deleteCreditCard(id);
        } catch (error) {
            alert(error);
        }
    }
</script>

<template>
<div class="w-full max-w-2xl h-full md:h-auto md:rounded-3xl border border-border bg-card pt-16 p-4 md:p-6 shadow-2xl">

    <div class="mb-6 flex items-center justify-center gap-2">
        <Icon name="lucide:credit-card" class="text-foreground h-6 w-6" />
        <h2 class="text-2xl font-bold text-foreground">
            {{ typeForm === "edit" ? "Editar Cartão" : "Adicione um Cartão" }}
        </h2>
    </div>

    <form class="space-y-5 text-orange" @submit.prevent="submit">

        <CardColorPicker v-if="colorPicker" @update:selected="setColor($event)" />
        <div class="w-full flex flex-col justify-center items-center">
            <div 
                @click="colorPicker = true"
                :style="['background-color: ' + form.color]"
                class="rounded-full w-20 h-20 hover:opacity-80 cursor-pointer"
            >
            </div>
            <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                Trocar Cor do Cartão
            </label>
        </div>

        <div>
            <label class="mb-2 block text-md text-secondary">Nome</label>

            <UiInput
                v-model="form.name"
                type="text"
                placeHolder="Ex: NuCard"
                :required="true"
            />
        </div>

        <div>
            <label class="mb-2 block text-md text-secondary">Limite</label>
            
            <UiAmountInput
                v-model="form.limit"
                :required="true"
            />
        </div>
        
        <div v-if="typeForm === 'create'" class="grid gap-4 grid-cols-2">
            <div>
                <label class="mb-2 block text-md text-secondary">Dia de fechamento</label>
                <UiInput
                    v-model="form.closingDay"
                    type="number"
                    placeHolder="3"
                    :required="true"
                />
            </div>

            <div>
                <label class="mb-2 block text-md text-secondary">Dia de vencimento</label>
                <UiInput
                    v-model="form.dueDay"
                    type="number"
                    placeHolder="5"
                    :required="true"
                />
            </div>
            
        </div>

        <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage" />

        <div :class="[props.typeForm === 'edit' ? 'grid gap-4 grid-cols-2' : '']">
            <button
                v-if="props.typeForm === 'edit'"
                @click="deleteCard(props.card.id)"
                type="button"
                class="bg-error hover:bg-error-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="loading" />
                <span v-else><Icon name="lucide:trash"/> Deletar Cartão</span>
            </button>

            <button
                type="submit"
                class="bg-primary hover:bg-primary-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="loading" />
                <span v-else>{{ typeForm === "edit" ? "Atualizar Cartão" : "Adicionar Cartão" }}</span>
            </button>

        </div>
    </form>
</div>
</template>