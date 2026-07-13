import type { Transaction } from "./transaction";

export interface AccountBase {
    name: string;
    icon: string;
    initialBalance: number;
}

export interface AccountRequest extends AccountBase {}

export interface AccountResponse extends AccountBase {
  id: string;
  transactions: Transaction[];
}