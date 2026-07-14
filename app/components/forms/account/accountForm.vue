<script setup lang="ts">
    // @ts-ignore
    import { SvgBanco } from "@edusites/bancos-brasil";
    import AccountIconPicker from "./AccountIconPicker.vue";
    
    const accountStore = useAccountStore();

    const emit = defineEmits(['success']);
    const props = defineProps({ 
        typeForm: {
            type: String,
            default: "create",
        },
        account: {
            type: Object,
            default: {
                id: '',
                name: 'Carteira',
                icon: 'wallet',
                initialBalance: 0
            },
        }
    });

    const form = reactive({
        name: props.account.name,
        icon: props.account.icon,
        initialBalance: props.account.initialBalance,
    });

    const loading = ref(false);
    const errorMessage = ref('');

    async function submit() {
        loading.value = true;
        errorMessage.value = '';

        try {
            if (props.typeForm === "edit") {
                await accountStore.updateAccount(props.account.id, form);
    
            } else {
                await accountStore.createAccount(form);
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

    const iconPicker = ref(false);

    function setIcon(icon: string) {
        iconPicker.value = false;
        form.icon = icon;
    }

    async function deleteAccount(id: string) {
        if (!confirm('Tem certeza que deseja excluir essa conta?')) return;

        try {
            await accountStore.deleteAccount(id);
        } catch (error) {
            alert(error);
        }
    }
</script>

<template>
<div class="bg-card w-full max-w-2xl h-full md:h-auto md:rounded-3xl border border-border pt-16 p-4 md:p-6 shadow-2xl">
    <div class="mb-6 flex items-center justify-center gap-2">
        <Icon name="lucide:wallet" class="text-foreground h-6 w-6" />
        <h2 class="text-2xl font-bold text-foreground">
            {{ typeForm === "edit" ? "Editar Conta" : "Adicione uma Conta" }}
        </h2>
    </div>

    <form class="space-y-5" @submit.prevent="submit">
        <AccountIconPicker v-if="iconPicker" @update:selected="setIcon($event)" />

        <div class="w-full flex flex-col justify-center items-center">
            <div 
                @click="iconPicker = true"
                class="flex bg-primary rounded-full w-20 h-20 hover:opacity-80 cursor-pointer"
            >
                <Icon v-if="form.icon == 'wallet'" :name="`lucide:${form.icon || 'wallet'}`" class="w-10 h-10 text-background m-auto" />
                <SvgBanco v-else :nome="form.icon" formato="circulo" tamanho="80" />
            </div>
            <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                Trocar icone
            </label>
        </div>

        <div>
            <label class="mb-2 block text-md text-secondary">Nome</label>

            <UiInput
                v-model="form.name"
                type="text"
                placeHolder="Ex: Banco do Brasil"
            />
        </div>

        <div>
            <label class="mb-2 block text-md text-secondary">Saldo inicial</label>

            <UiAmountInput
                v-model="form.initialBalance"
                color="primary"
            />
        </div>

        <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage"/>

        <div :class="[props.typeForm === 'edit' ? 'grid gap-4 grid-cols-2' : '']">
            <button
                v-if="props.typeForm === 'edit'"
                @click="deleteAccount(props.account.id)"
                type="button"
                class="bg-error hover:bg-error-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="loading" />
                <span v-else><Icon name="lucide:trash"/> Deletar Conta</span>
            </button>

            <button
                type="submit"
                class="bg-primary hover:bg-primary-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="loading" />
                <span v-else>{{ typeForm === "edit" ? "Atualizar Conta" : "Adicionar Conta" }}</span>
            </button>

        </div>
        
    </form>
</div>
</template>