import type { InvoiceContextResponse, CreditCardRequest, CreditCardResponse, Invoice } from "~/types/credit-card";

export const creditCardService = {
    async getAll() {
        const api = useApi();

        return await api<CreditCardResponse[]>('/credit-cards', {
            method: 'GET'
        });
    },

    async get(id: string) {
        const api = useApi();

        return await api<CreditCardResponse>(`/credit-cards/${id}`, {
            method: 'GET'
        });
    },

    async getCurrentInvoices() {
        const api = useApi();

        return await api<Invoice[]>(`/invoices`, {
            method: 'GET'
        });
    },

    async getInvoiceContext(date: string) {
        const api = useApi();

        return await api<InvoiceContextResponse[]>(`/invoices/context/${date}`, {
            method: 'GET'
        });
    },

    async create(creditCard: CreditCardRequest) {
        const api = useApi();

        return await api<CreditCardResponse>('/credit-cards', {
            method: 'POST',
            body: creditCard
        });
    },

    async update(id: string, creditCard: CreditCardRequest) {
        const api = useApi();

        return await api<CreditCardResponse>(`/credit-cards/${id}`, {
            method: 'PUT',
            body: creditCard
        });
    },

    async delete(id: string) {
        const api = useApi();

        return await api(`/credit-cards/${id}`, {
            method: 'DELETE'
        });
    }
};