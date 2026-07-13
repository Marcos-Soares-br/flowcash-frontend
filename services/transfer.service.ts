import type { TransferRequest, TransferResponse } from "~/types/transfer";

export const transferService = {
    async create(transfer: TransferRequest) {
        const api = useApi();

        return await api<TransferResponse>('/transfers', {
            method: 'POST',
            body: transfer
        });
    }
}