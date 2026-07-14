<script setup lang="ts">
    import BaseModal from '~/components/common/BaseModal.vue';
    import GoalsList from '~/components/common/GoalsList.vue';
    import GoalForm from '~/components/forms/goal/GoalForm.vue';
    import type { GoalResponse } from '~/types/goal';

    definePageMeta({
        middleware: 'auth'
    });

    const goalStore = useGoalStore();

    const showGoalModal = ref(false);
    const goalModalType = ref<'create' | 'edit'>('create');
    const goalToEdit = ref<Partial<GoalResponse> | null>(null);

    function openGoalsModal( action: 'create' | 'edit', goal?: Partial<GoalResponse> | null ) {
        goalModalType.value = action;
        goalToEdit.value = goal ?? null;
        showGoalModal.value = true;
    }

    await goalStore.getGoals();

    const goals = computed(() => goalStore.goals);
</script>

<template>
    <section class="flex flex-col gap-8 rounded-2xl p-2 md:p-5">
        <GoalsList
            from="metas"
            :goals="goals"
            @create="openGoalsModal('create')"
            @edit="openGoalsModal('edit', $event)"
        />
    </section>

    <BaseModal
        :modelValue="showGoalModal"
        @update:modelValue="showGoalModal = false"
    >
        <GoalForm
            :key="`${goalModalType}-${goalToEdit?.id ?? 'new'}`"
            :typeForm="goalModalType"
            :goal="goalToEdit || undefined"
            @success="showGoalModal = false"
        />
    </BaseModal>
</template>