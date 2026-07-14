<script setup lang="ts">

    const emit = defineEmits(['success']);

    const accountsStore = useAccountStore();
    const transfersStore = useTransferStore();

    const loading = ref(false);
    const errorMessage = ref('');

    const form = reactive({
        amount: 0,
        fromAccountId: "",
        toAccountId: ""
    });

    async function submit() {
        loading.value = true;
        errorMessage.value = '';
        
        try {

            if (form.fromAccountId === form.toAccountId) {
                throw new Error("Conta de origem e destino devem ser diferentes");
            }

            await transfersStore.createTransfer(form);

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
</script>

<template>
<div class="bg-card w-full max-w-2xl h-full md:h-auto md:rounded-3xl md:border border-border pt-16 p-4 md:p-6 shadow-2xl">

    <div class="mb-6 flex items-center justify-center gap-2">
        <h2 class="text-2xl font-bold text-foreground"> 
            Transferências
        </h2>
    </div>

    <form class="space-y-6" @submit.prevent="submit">

        <div>
            <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                <Icon name="dollar-sign" class="h-4 w-4" /> Valor
            </label>

            <UiAmountInput
                v-model="form.amount"
                color="primary"
            />
        </div>

        <div class="grid gap-4 grid-cols-[1fr_auto_1fr] items-center">
            <div>
                <label class="mb-2 block text-md text-secondary">Conta de Origem</label>
    
                <select
                    v-model="form.fromAccountId"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                >
                    <option value="">Selecione</option>
    
                    <option
                        v-for="account in accountsStore.accounts"
                        :key="account.id"
                        :value="account.id"
                    >
                        {{ account.name }}
                    </option>
                </select>
            </div>

            <Icon name="move-right" class="text-foreground h-6 w-6 md:mt-6" />

            <div>
                <label class="mb-2 block text-md text-secondary">Conta de Destino</label>
    
                <select
                    v-model="form.toAccountId"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                >
                    <option value="">Selecione</option>
    
                    <option
                        v-for="account in accountsStore.accounts"
                        :key="account.id"
                        :value="account.id"
                    >
                        {{ account.name }}
                    </option>
                </select>
            </div>

        </div>

        <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage"/>

        <button
            type="submit"
            class="w-full bg-primary hover:bg-primary-hover rounded-xl px-4 py-3 font-semibold text-background transition"
        >
            <UiLoadSpinner v-if="loading"/>
            <span v-else>Transferir</span>
        </button>
    </form>
</div>
</template>