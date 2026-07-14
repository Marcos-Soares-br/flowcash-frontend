import type { 
    TransactionRequest, 
    creditTransactionRequest, 
    TransactionsReport, 
    Transaction, 
    DashboardResponse,
    DailyCashFlowResponse,
    TransactionsCategoriesReport, 
    TransactionsDailyCashFlow 
} from "~/types/transaction";
import { transactionService } from '../../services/transaction.service';

export const useTransactionStore = defineStore('transactions', {
    state: () => ({
        reports: [] as TransactionsReport[],
        
        categories: { 
            income: [{category: '', amount: 0}], 
            expense: [{category: '', amount: 0}] 
        } as TransactionsCategoriesReport,

        dailyCashFlow: [] as TransactionsDailyCashFlow[],

        dashboard: {
            totalBalance: 0, 
            monthlyIncome: 0, 
            monthlyExpense: 0, 
            variation: 0, 
            upcomingTransactions: [], 
            overdueTransactions: []
        } as DashboardResponse
    }),

    getters: {
        getReportByMonth: (state) => (month: string) => {
            const report = state.reports.find(report => report.month === month);

            return report?.report;
        },

        getDailyCashFlowByMonth: (state) => (month: string) => {
            const flow = state.dailyCashFlow.find(flow => flow.month === month);

            return flow?.flow;
        },

    },
    
    actions: {
        async getReport(month: string) {
            try {
                const report = await transactionService.getReport(month);

                report.initialBalance = Number(Number(report.initialBalance).toFixed(2));
                report.monthIncomes = Number(Number(report.monthIncomes).toFixed(2));
                report.monthExpenses = Number(Number(report.monthExpenses).toFixed(2));
                report.monthlyBalance = Number(Number(report.monthlyBalance).toFixed(2));
                report.resultBalance = Number(Number(report.resultBalance).toFixed(2));
                report.transactions.forEach(transaction => {
                    transaction.amount = Number(Number(transaction.amount).toFixed(2))
                });
                report.creditTransactions.forEach(transaction => {
                    transaction.amount = Number(Number(transaction.amount).toFixed(2))
                })

                const index = this.reports.findIndex(r => r.month === month);

                if (index >= 0) {
                    this.reports[index]!.report = report;
                } else {
                    this.reports.push({ month, report });
                }

                return report;

            } catch (error) {
                throw error;
            }
        },

        async getDashboard() {
            try {
                const response = await transactionService.getDashboard();

                response.totalBalance = Number(Number(response.totalBalance).toFixed(2));
                response.monthlyIncome = Number(Number(response.monthlyIncome).toFixed(2));
                response.monthlyExpense = Number(Number(response.monthlyExpense).toFixed(2));
                response.upcomingTransactions.forEach(transaction => transaction.amount = Number(Number(transaction.amount).toFixed(2)));
                response.overdueTransactions.forEach(transaction => transaction.amount = Number(Number(transaction.amount).toFixed(2)));

                this.dashboard = response;

                return response;

            } catch (error) {
                throw error;
            }
        },
        
        async getDailyCashFlow(month: string) {
            try {
                const response = await transactionService.getDailyCashFlow(month);

                response.forEach(transaction => {
                    const date = new Date(`${transaction.date}T04:00:00`);
                    const dateString = date.toLocaleString('pt-BR', { day: '2-digit', month: 'short' });
                    transaction.date = dateString;
                });

                this.dailyCashFlow.push({
                    month: month as string, 
                    flow: response as DailyCashFlowResponse[]
                });

                return response;

            } catch (error) {
                throw error;
            }

        },

        async getCategories(year: string, month: string | null) {
            try {
                const response = await transactionService.getCategoriesReport(year, month);

                this.categories = response;

                return response;

            } catch (error) {
                throw error;
            }
        },

        async createTransaction(transaction: TransactionRequest) {
            try {
                const response = await transactionService.createTransaction(transaction);

                this.updateState(response.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }
        },
        async updateTransaction(id: string, transaction: Partial<TransactionRequest>) {
            try {
                const response = await transactionService.updateTransaction(id, transaction);

                this.updateState(response.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }

        },
        async deleteTransaction(id: string) {
            try {
                const response = await transactionService.deleteTransaction(id);

                const transaction = this.reports.map( r => {
                    return r.report.transactions.find(transaction => transaction.id === id);
                });

                this.updateState(transaction[0]!.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }

        },

        async createCreditTransaction(creditTransaction: creditTransactionRequest) {
            try {
                const response = await transactionService.createCreditTransaction(creditTransaction);

                this.updateState(response.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }
        },
        async updateCreditTransaction(id: string, creditTransaction: Partial<creditTransactionRequest>) {
            try {
                const response = await transactionService.updateCreditTransaction(id, creditTransaction);

                this.updateState(response.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }
        },
        async deleteCreditTransaction(id: string) {
            try {
                const response = await transactionService.deleteCreditTransaction(id);

                const transaction = this.reports.map( r => {
                    return r.report.creditTransactions.find(t => t.id === id);
                });

                this.updateState(transaction[0]!.date.toISOString().slice(0, 7));

                return response;

            } catch (error) {
                throw error;
            }

        },

        async updateState(month?: string) {
            const accountService = useAccountStore();
            const creditCardService = useCreditCardStore();

            await accountService.loadAccounts(true);

            this.getDashboard();
            this.getReport(month as string);
            this.getDailyCashFlow(month as string);

            await creditCardService.loadCreditCards(true);
        },
    }
});