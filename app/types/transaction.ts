import type { AccountResponse } from "~/types/account";

export interface TransactionRequest {
    title:  string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    status: 'PENDING' | 'COMPLETED';
    date: Date;
    frequency: 'WEEKLY' | 'MONTHLY';
    category: string;
    accountId: string;
}

export interface Transaction extends TransactionRequest {
    id: string;
    account: AccountResponse;
}

export interface TransactionsReport {
    month: string;
    report: ReportResponse;
}

export interface ReportResponse {
    transactions: Transaction[];
    creditTransactions: creditTransaction[]; 
    initialBalance: number;
    monthIncomes: number;
    monthExpenses: number;
    monthlyBalance: number;
    resultBalance: number;
}

export interface DashboardResponse {
    totalBalance: number; 
    variation: number;
    monthlyIncome: number;
    monthlyExpense: number;
    upcomingTransactions: Transaction[];
    overdueTransactions: Transaction[];
} 

export interface TransactionsDailyCashFlow {
    month: string;
    flow: DailyCashFlowResponse[];
}
export interface DailyCashFlowResponse {
    date: string;
    income: number; 
    expense: number;
    result: number;
    balanceDay: number;
}

export interface TransactionsCategoriesReport {
    income: { category: string, amount: number }[];
    expense: { category: string, amount: number }[];
}

// Credit Transaction
export interface creditTransactionRequest {
    title: string;
    amount: number;
    totalInstallments: number;
    category: string;
    date: Date;
}

export interface creditTransaction extends creditTransactionRequest {
    id: string;
    installment: number;
    groupId: string | null;
    creditCardId: string;
    invoiceId: string | null;
    creditCard: {
        id: string;
        name: string;
    };
}