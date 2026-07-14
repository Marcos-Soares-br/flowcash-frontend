<script setup lang="ts">

    const accountStore = useAccountStore();
    const creditCardStore = useCreditCardStore();
    const transactionStore = useTransactionStore();

    const emit = defineEmits(['success']);
    const props = defineProps({
        type: {
            type: String,
            default: "EXPENSE",
        },
        transaction: {
            type: Object,
            default: {},
        },
        typeForm: {
            type: String,
            default: "create",
        },
    });

    const loading = ref(false);
    const deleteLoading = ref(false);
    const errorMessage = ref('');
    const categories = [
        "alimentacao",
        "mercado",
        "moradia",
        "transporte",
        "saude",
        "educacao",
        "investimentos",
        "viagem",
        "entertenimento",
        "salario",
        "freelance",
        "presente",
        "outros",
    ];

    const formGeral = reactive({
        type: props.type as "INCOME" | "EXPENSE",
        status: props.transaction.status || "PENDING" as "PENDING" | "COMPLETED",
        title: props.transaction.title || "",
        amount: props.transaction.amount || 0 as number,
        date: props.transaction?.date || new Date().toISOString().split('T')[0],
        category: props.transaction.category || "",
        frequency: props.transaction.frequency || null as "WEEKLY" | "MONTHLY" | "YEARLY" | null,
        installment: 1 as number,
        totalInstallments: props.transaction.totalInstallments || 1 as number,
        accountId: props.transaction.accountId || "",
        creditCardId: props.transaction.creditCardId || "",
        paymentMethod: "",
    });

    function selectPaymentMethod(value: string) {
        formGeral.paymentMethod = value;

        formGeral.accountId = "";
        formGeral.creditCardId = "";

        if (!value) return;

        const [type, id] = value.split(":") as [string, string];

        if (type === "account") formGeral.accountId = id;

        if (type === "card") formGeral.creditCardId = id;
    }

    async function submit() {
        loading.value = true;
        errorMessage.value = '';

        try {
            if (props.typeForm === "edit") {

                const form = {
                    title: formGeral.title,
                    amount: Number(formGeral.amount),
                    date: formGeral.date,
                    category: formGeral.category,
                };

                if (formGeral.accountId) {

                    await transactionStore.updateTransaction(
                        props.transaction.id, 
                        {
                            status: formGeral.status,
                            ...form
                        }
                    );

                } else if (formGeral.creditCardId) {

                    await transactionStore.updateCreditTransaction(
                        props.transaction.id, 
                        form
                    );
                }
            } else {

                if (formGeral.accountId) {
                    const form = {
                        type: formGeral.type,
                        status: formGeral.status,
                        title: formGeral.title,
                        amount: Number(formGeral.amount),
                        date: formGeral.date,
                        category: formGeral.category,
                        frequency: formGeral.frequency,
                        accountId: formGeral.accountId,
                    };

                    await transactionStore.createTransaction(form);

                } else if (formGeral.creditCardId) {

                    const form = {
                        title: formGeral.title,
                        amount: Number(formGeral.amount),
                        date: formGeral.date,
                        category: formGeral.category,
                        installment: formGeral.installment,
                        totalInstallments: formGeral.totalInstallments,
                        creditCardId: formGeral.creditCardId,
                    };

                    await transactionStore.createCreditTransaction(
                        form
                    );
                }
                
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

    async function deleteTransaction(id: string) {
        if (confirm("Tem certeza que deseja excluir essa transação?")) {
            try {
                deleteLoading.value = true;

                await transactionStore.deleteTransaction(id);

            } catch (error) {
                alert(error);
            } finally {
                deleteLoading.value = false;
            }
        }
    }
</script>

<template>
<div class="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl">

    <div class="mb-6 flex items-center justify-center gap-2">
        <Icon name="lucide:arrow-up-circle" v-if="formGeral.type === 'INCOME'" class="h-6 w-6 text-success" />
        <Icon name="lucide:arrow-down-circle" v-else class="mt-1 h-6 w-6 text-error" />
        <h2 class="text-2xl font-bold text-foreground"> 
            {{ $props.typeForm === "edit" ? "Editar" : "Adicionar" }}
            {{ formGeral.type === "INCOME" ? "Receita" : "Despesa" }}
        </h2>
    </div>

    <form class="space-y-5" @submit.prevent="submit">

        <div>
            <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                <Icon name="lucide:dollar-sign" class="text-secondary h-4 w-4" /> Valor
            </label>

            <UiAmountInput
                v-model="formGeral.amount"
                :color="formGeral.type === 'INCOME' ? 'success' : 'error'"
            />
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <div>
                <label class="mb-2 block text-md text-secondary">Nome</label>

                <UiInput
                    v-model="formGeral.title"
                    type="text"
                    placeHolder="Ex: Freelance, Salário..."
                />
            </div>

            <div class="">
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:calendar" class="h-4 w-4" /> Data
                </label>
                <div class="w-full flex items-center gap-2">
                    <UiInput
                        v-model="formGeral.date"
                        type="date"
                    />
                    <Icon 
                        v-if="formGeral.type !== 'CREDIT'"
                        @click="formGeral.status = formGeral.status == 'PENDING' ? 'COMPLETED': 'PENDING'"
                        :name="formGeral.status == 'PENDING' ? 'lucide:clock': 'lucide:check'"
                        title="Marcar como paga"
                        :class="[formGeral.status == 'PENDING' ? 'text-warning' : 'text-success', 'w-8 h-8 cursor-pointer']" 
                    />
                </div>
            </div>

        </div>
        
        <div class="grid gap-4 md:grid-cols-2">
            <div>
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:tag" class="h-4 w-4" /> Categoria
                </label>
    
                <select
                    v-model="formGeral.category"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                >
                    <option value="">Selecione</option>
    
                    <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                    >
                        {{ category }}
                    </option>
                </select>
            </div>
    
            <div v-if="props.typeForm === 'create'">
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:wallet" class="h-4 w-4" />
                    {{ formGeral.type === "INCOME" ? "Receber em" : "Pagar com" }}
                </label>
    
                <select
                    :value="formGeral.paymentMethod"
                    @change="selectPaymentMethod(($event.target as HTMLSelectElement).value)"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                >
                    <option value="">Selecione</option>
    
                    <optgroup label="Contas">
                        <option
                            v-for="account in accountStore.accounts"
                            :key="account.id"
                            :value="`account:${account.id}`"
                        >
                            {{ account.name }}
                        </option>
                    </optgroup>
    
                    <optgroup v-if="formGeral.type === 'EXPENSE'" label="Cartões">
                        <option
                            v-for="card in creditCardStore.creditCards"
                            :key="card.id"
                            :value="`card:${card.id}`"
                        >
                            {{ card.name }}
                        </option>
                    </optgroup>
                </select>
            </div>
        </div>

        <div :class="[formGeral.creditCardId ? 'grid gap-4 md:grid-cols-2' : '']">

            <div v-if="props.typeForm === 'create' || props.typeForm === 'edit' && !formGeral.creditCardId">
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:repeat" class="h-4 w-4" /> Recorrência
                </label>

                <select
                    v-model="formGeral.frequency"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                >
                    <option :value="null">Não recorrente</option>
                    <option value="WEEKLY">Semanal</option>
                    <option value="MONTHLY">Mensal</option>
                </select>
            </div>

            <div v-if="formGeral.creditCardId">
                <label class="mb-2 block text-md text-secondary">
                    <Icon name="lucide:credit-card" class="h-4 w-4" /> Parcelas
                </label>

                <input
                    v-model="formGeral.totalInstallments"
                    type="number"
                    placeHolder="1"
                    class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground"
                />
            </div>
        </div>

        <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage" /> 

        <div :class="[props.typeForm === 'edit' ? 'grid gap-4 grid-cols-2' : '']">
            <button
                v-if="props.typeForm === 'edit'"
                @click="deleteTransaction(props.transaction.id)"
                type="button"
                class="bg-error hover:bg-error-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="deleteLoading" />
                <span v-else><Icon name="lucide:trash"/> Deletar {{ formGeral.type === "INCOME" ? "Receita" : "Despesa" }}</span>
            </button>

            <button
                type="submit"
                class="bg-success hover:bg-success-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
            >
                <UiLoadSpinner v-if="loading" />
                <span v-else>Salvar {{ formGeral.type === "INCOME" ? "Receita" : "Despesa" }}</span>
            </button>

        </div>
    </form>
</div>
</template>