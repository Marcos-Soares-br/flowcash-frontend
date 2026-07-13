export interface TransferRequest {
    amount: number;
    fromAccountId: string;
    toAccountId: string;
}
export interface TransferResponse extends TransferRequest {
    id: string;
}