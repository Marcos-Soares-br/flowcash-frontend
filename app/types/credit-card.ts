import type { creditTransaction } from "./transaction";

export interface CreditCardRequest {
    name: string;
    color: string;
    limit: number;
    closingDay: number;
    dueDay: number;
}

export interface CreditCardResponse extends CreditCardRequest {
    id: string;
}

export interface Invoice {
    id: string;
    amount: number;
    status: 'OPEN' | 'PAID' | 'CLOSED';
    startDate: Date;
    endDate: Date;
    dueDate: Date;
    creditCardId: string;
    transactions: creditTransaction[];
}

export interface InvoiceContextResponse {
    previous: Invoice | null;
    current: Invoice | null;
    next: Invoice | null;
}