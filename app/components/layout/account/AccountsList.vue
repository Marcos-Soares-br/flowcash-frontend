<script setup lang="ts">
    // @ts-ignore 
    import { SvgBanco } from "@edusites/bancos-brasil";
    import BaseModal from "~/components/common/BaseModal.vue";
    import AccountForm from "~/components/forms/account/accountForm.vue";

    const accountStore = useAccountStore();
    const accounts = computed(() => accountStore.accounts);

    const props = defineProps({
        valuesHidden: {
            type: Boolean,
            default: false
        }
    });

    const { open } = useModal();
</script>

<template>
    <div class="flex flex-col">
        <h2 class="text-md font-semibold text-secondary mb-3">Contas</h2>
        <div class="space-y-2">

            <p v-if="accounts.length === 0" class="text-sm text-secondary">
                Use o menu superior direito para adicionar uma conta.
            </p>

            <div 
                v-for="account in accounts" 
                @click="open('account', { typeForm: 'edit', account})"
                class="bg-card rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:bg-border transition"
            >
                <div class="w-10 h-10">
                    <div v-if="account.icon == 'wallet'" class="flex bg-primary rounded-full w-10 h-10">
                        <Icon name="lucide:wallet" class="w-6 h-6 text-background m-auto" />
                    </div>

                    <SvgBanco v-else :nome="account.icon" formato="circulo" :tamanho="40" />
                </div>
                <div>
                    <p class="text-md font-semibold text-foreground ">{{ account.name }}</p>
                </div>
                <p :class="[valuesHidden  ? 'blur user-select-none': '', 'text-lg text-foreground font-inter font-bold sensitive ml-auto']">
                    {{ accountStore.getAccountBalance(account.id).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </p>
            </div>

        </div>
    </div>
</template>