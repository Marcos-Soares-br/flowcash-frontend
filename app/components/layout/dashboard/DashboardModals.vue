<script setup lang="ts">
    import BaseModal from '~/components/common/BaseModal.vue';
    import CurrentInvoices from '../invoice/CurrentInvoices.vue';
    import TransferForm from '~/components/forms/transfer/TransferForm.vue';
    import TransactionForm from '~/components/forms/transaction/TransactionForm.vue';
    import AccountForm from '~/components/forms/account/accountForm.vue';
    import CreditCardForm from '~/components/forms/credit-card/CreditCardForm.vue';

    const { close } = useModal();
    const modal = useModal().modal;
</script>

<template>
    <BaseModal
        :model-value="modal.name !== null"
        @update:model-value="close"
    >

        <AccountForm
            v-if="modal.name === 'account'"
            v-bind="modal.props"
            @success="close"
        />

        <CreditCardForm
            v-else-if="modal.name === 'card'"
            v-bind="modal.props"
            @success="close"
        />

        <TransactionForm
            v-else-if="modal.name === 'transaction'"
            v-bind="modal.props"
            @success="close"
        />

        <TransferForm
            v-else-if="modal.name === 'transfer'"
            @success="close"
        />

        <CurrentInvoices
            v-else-if="modal.name === 'invoices'"
            :v-bind="modal.props"
            @success="close"
        />

    </BaseModal>
</template>