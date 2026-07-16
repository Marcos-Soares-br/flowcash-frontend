import type { AccountResponse, AccountRequest} from "~/types/account";
import { accountService } from "../../services/account.service";

export const useAccountStore = defineStore('accounts', {
    state: () => ({
        accounts: [] as AccountResponse[],
        loaded: false
    }),

    getters: {
        getAccountBalance: (state) => (id: string) => {
            const account = state.accounts.find(account => account.id === id);
            const transactions = state.accounts.find(account => account.id === id)?.transactions || [];
            let balance = account?.initialBalance || 0;

            transactions.forEach( (transaction) => {
                if (transaction.type === "INCOME" && transaction.status === "COMPLETED") { 
                    balance += Number(transaction.amount);
                }
                if (transaction.type === "EXPENSE" && transaction.status === "COMPLETED") {
                    balance -= Number(transaction.amount);
                }
            });

            return balance;
        }
    },

    actions: {
        async loadAccounts(force = false) {
            try {
                if (this.loaded && !force) return;

                const data = await accountService.getAll();

                data.forEach(account => {
                    account.initialBalance = Number(Number(account.initialBalance).toFixed(2))
                });

                this.accounts = data;

                this.loaded = true;

                return data;

            } catch (error) {
                throw error;
            }
        },

        async getAccount(id: string) {
            try {
                const cached = this.accounts.find(a => a.id === id);

                if (cached) return cached;

                return accountService.get(id);

            } catch (error) {
                throw error;
            }
        },

        async createAccount(account: AccountRequest) {
            try {
                const data = await accountService.create(account);

                data.initialBalance = Number(Number(data.initialBalance).toFixed(2));

                this.accounts.push(data);

                useTransactionStore().getDashboard();

                return data;

            } catch (error) {
                throw error;
            }
        },

        async updateAccount(id: string, account: AccountRequest) {
            try {
                const data = await accountService.update(id, account);

                const index = this.accounts.findIndex(account => account.id === id);

                this.accounts[index] = data;

                useTransactionStore().getDashboard();

                return data;

            } catch (error) {
                throw error;
            }
        },

        async deleteAccount(id: string) {
            try {
                await accountService.delete(id);

                const index = this.accounts.findIndex(account => account.id === id);

                this.accounts.splice(index, 1);

                useTransactionStore().getDashboard();

            } catch (error) {
                throw error;
            }

        }
    }
});