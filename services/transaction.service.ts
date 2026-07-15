import type { 
    ReportResponse, 
    DashboardResponse, 
    DailyCashFlowResponse, 
    TransactionsCategoriesReport, 
    Transaction, 
    TransactionRequest,
    creditTransaction, 
    creditTransactionRequest 

} from "~/types/transaction";

export const transactionService = {
    async getReport(month: string) {
        const api = useApi();

        return await api<ReportResponse>(`/transactions/report/${month}`, {
            method: 'GET'
        });
    },

    async getDashboard() {
        const api = useApi();

        return await api<DashboardResponse>('/transactions/dashboard', {
            method: 'GET'
        });
    },

    async getDailyCashFlow(month: string) {
        const api = useApi();

        return await api<DailyCashFlowResponse[]>(`/transactions/daily-cash-flow/${month}`, {
            method: 'GET'
        });
    },

    async getCategoriesReport(year: string, month: string | null) {
        const api = useApi();

        if(month === null) month = '';

        return await api<TransactionsCategoriesReport>(`/transactions/categories-report?year=${year}&month=${month}`, {
            method: 'GET'
        })
    },

    async createTransaction(transaction: TransactionRequest) {
        const api = useApi();

        return await api<Transaction>('/transactions', {
            method: 'POST',
            body: transaction
        });
    },

    async updateTransaction(id: string, transaction: Partial<Transaction>) {
        const api = useApi();

        return await api<Transaction>(`/transactions/${id}`, {
            method: 'PUT',
            body: transaction
        });
    },

    async deleteTransaction(id: string, onlyThis: boolean, recurrenceId?: string) {
        const api = useApi();

        return await api(`/transactions/${id}`, {
            method: 'DELETE',
            body: { 
                onlyThis,
                recurrenceId
            }
        });
    },

    async createCreditTransaction(creditTransaction: creditTransactionRequest) {
        const api = useApi();

        return await api<creditTransaction>('/credit-transactions', {
            method: 'POST',
            body: creditTransaction
        });
    },

    async updateCreditTransaction(id: string, creditTransaction: Partial<creditTransaction>) {
        const api = useApi();

        return await api<creditTransaction>(`/credit-transactions/${id}`, {
            method: 'PUT',
            body: creditTransaction
        });
    },

    async deleteCreditTransaction(id: string) {
        const api = useApi();

        return await api(`/credit-transactions/${id}`, {
            method: 'DELETE'
        })
    },


};