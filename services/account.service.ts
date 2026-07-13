import type { AccountRequest, AccountResponse } from "~/types/account";

export const accountService = {
    async getAll() {
        const api = useApi();

        return await api<AccountResponse[]>('/accounts', {
            method: 'GET'
        });
    },

    async get(id: string) {
        const api = useApi();

        return await api<AccountResponse>(`/accounts/${id}`, {
            method: 'GET'
        });
    },

    async create(account: AccountRequest) {
        const api = useApi();

        return await api<AccountResponse>('/accounts', {
            method: 'POST',
            body: account
        });
    },

    async update(id: string, account: AccountRequest) {
        const api = useApi();

        return await api<AccountResponse>(`/accounts/${id}`, {
            method: 'PATCH',
            body: account
        });
    },

    async delete(id: string) {
        const api = useApi();

        return await api(`/accounts/${id}`, {
            method: 'DELETE'
        });
    }
}