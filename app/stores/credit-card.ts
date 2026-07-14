import type { CreditCardRequest, CreditCardResponse, InvoiceContextResponse, Invoice } from "~/types/credit-card";
import { creditCardService } from '../../services/credit-card.service';

export const useCreditCardStore = defineStore('creditCards', {
    state: () => ({
        loaded: false,
        creditCards: [] as CreditCardResponse[],
        currentInvoices: [] as Invoice[],
        invoiceContext: [] as InvoiceContextResponse[],
    }),

    getters: {
        getAvaliableLimit: (state) => (id: string) => {
            const invoiceAmount = 
                state.currentInvoices.find(invoice => invoice.creditCardId === id)?.amount || 0;

            const limit = state.creditCards.find(creditCard => creditCard.id === id)?.limit || 0;

            return limit - invoiceAmount || 0;
        }
    },
    
    actions: {
        async loadCreditCards(force = false) {
            try {
                if (this.loaded && !force) return;

                const response = await creditCardService.getAll();

                response.forEach( creditCard => {
                    creditCard.limit = Number(Number(creditCard.limit).toFixed(2));
                });

                this.creditCards = response;

                this.loaded = true;
                
                return response;

            } catch (error) {
                throw error;
            }
        },

        async getCreditCard(id: string) {
            try {
                const cached = this.creditCards.find(creditCard => creditCard.id === id);

                if (cached) return cached;

                return creditCardService.get(id);

            } catch (error) {
                throw error;
            }
        },

        async getCurrentInvoices() {
            try {
                const response = await creditCardService.getCurrentInvoices();

                if (response[0]) {

                    response.forEach(invoice => {
                        invoice.amount = Number(Number(invoice.amount).toFixed(2));
                        
                        invoice.transactions.forEach(transaction => {
                            transaction.amount = Number(Number(transaction.amount).toFixed(2))
                        });
                    });
    
                    this.currentInvoices = response;
                }
                
                return response;

            } catch (error) {
                throw error;
            }
        },

        async getInvoiceContext(date: string) {
            try {
                const response = await creditCardService.getInvoiceContext(date);

                response.forEach(invoice => {
                    if (invoice.previous) {
                        invoice.previous.amount = Number(Number(invoice.previous.amount).toFixed(2));
                    }

                    if (invoice.current) {
                        invoice.current.amount = Number(Number(invoice.current.amount).toFixed(2));
                    }

                    if (invoice.next) {
                        invoice.next.amount = Number(Number(invoice.next.amount).toFixed(2));
                    }
                });

                this.invoiceContext = response;
                
                return response;

            } catch (error) {
                throw error;
            }
        },

        async createCreditCard(creditCard: CreditCardRequest) {
            try {
                const response = await creditCardService.create(creditCard);

                response.limit = Number(Number(response.limit).toFixed(2));

                this.creditCards.push(response);

                return response;

            } catch (error) {
                throw error;
            }
        },

        async updateCreditCard(id: string, creditCard: CreditCardRequest) {
            try {
                const response = await creditCardService.update(id, creditCard);

                const index = this.creditCards.findIndex(creditCard => creditCard.id === id);

                this.creditCards[index] = response;

                return response;

            } catch (error) {
                throw error;
            }
        },

        async deleteCreditCard(id: string) {
            try {
                await creditCardService.delete(id);

                const index = this.creditCards.findIndex(creditCard => creditCard.id === id);

                this.creditCards.splice(index, 1);

            } catch (error) {
                throw error;
            }
        },
    }
});