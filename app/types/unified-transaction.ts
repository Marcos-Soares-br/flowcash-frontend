export type UnifiedTransaction = {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'CREDIT';
  status: 'COMPLETED' | 'PENDING';
  category: string;
  date: string;
  account: {
    name: string;
  };
  installment?: number;
  totalInstallments?: number;
}