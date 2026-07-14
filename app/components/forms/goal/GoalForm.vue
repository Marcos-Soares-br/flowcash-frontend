<script setup lang="ts">
    import UiAmountInput from '~/components/ui/UiAmountInput.vue';
    import GoalIconPicker from './GoalIconPicker.vue';
    
    const goalStore = useGoalStore();

    const props = defineProps({
        goal: {
            type: Object,
            default: {},
        },
        typeForm: {
            type: String,
            default: "create",
        },
    });

    const emit = defineEmits(['success']);

    const errorMessage = ref('');

    const form = reactive({
        title: props.goal.title || "" as string,
        icon: props.goal.icon || "lucide:car-front" as string,
        targetAmount: props.goal.targetAmount || 0 as number,
        currentAmount: props.goal.currentAmount || 0 as number,
    });

    const iconPicker = ref(false);
    function setIcon(icon: string) {
        iconPicker.value = false;
        form.icon = icon;
    }

    async function submit() {
        errorMessage.value = '';

        try {
            if (props.typeForm === "edit") {

                const response = await goalStore.updateGoal(
                    props.goal.id, 
                    form
                );

                emit("success");

                return response;

            } else {
                
                const response = await goalStore.createGoal(form);

                emit("success");

                return response;
                
            }

        } catch (error: any) {
            errorMessage.value =
                error.data?.message ?? 
                error.response?._data?.message ?? 
                error.message;
        }

    }
</script>

<template>
<div class="w-full max-w-2xl  h-full md:h-auto md:rounded-3xl border border-border bg-card p-6 shadow-2xl">

    <div class="mb-6 flex items-center justify-center gap-2">
        <h2 class="text-2xl font-bold text-foreground"> 
            {{ $props.typeForm === "edit" ? "Editar" : "Adicionar" }}
            Meta
        </h2>
    </div>

    <form class="space-y-5" @submit.prevent="submit">

        <GoalIconPicker v-if="iconPicker" @update:selected="setIcon($event)" />
        <div class="w-full flex flex-col justify-center items-center">
            <div 
                @click="iconPicker = true"
                class="bg-primary rounded-full flex items-center justify-center w-20 h-20 hover:opacity-80 cursor-pointer"
            >
                <Icon :name="form.icon" class="w-12 h-12 text-background" />
            </div>
            <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                Selecionar icone
            </label>
        </div>

        <div>
            <label class="mb-2 block text-md text-secondary">Nome</label>

            <UiInput
                v-model="form.title"
                type="text"
                placeHolder="Ex: Carro"
            />
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <div>
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:dollar-sign" class="h-4 w-4" /> Valor alvo
                </label>

                <UiAmountInput
                    v-model="form.targetAmount"
                    color="success"
                />
            </div>

            <div>
                <label class="mb-2 flex items-center gap-2 text-md text-secondary">
                    <Icon name="lucide:dollar-sign" class="h-4 w-4" /> Valor atual
                </label>

                <UiAmountInput
                    v-model="form.currentAmount"
                    color="primary"
                />
            </div>
        </div>

        <UiAlert v-if="errorMessage !== ''" type="error" :message="errorMessage"/>

        <button
            type="submit"
            class="bg-primary hover:bg-primary-hover w-full rounded-xl px-4 py-3 font-semibold text-background transition"
        >
            Salvar Meta
        </button>
    </form>
</div>
</template>