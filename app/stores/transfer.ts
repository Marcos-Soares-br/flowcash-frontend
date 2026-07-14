import type { TransferRequest } from "~/types/transfer";
import { transferService } from "../../services/transfer.service";

export const useTransferStore = defineStore('transfers', {
    actions: {
        async createTransfer(transfer: TransferRequest) {
            try {
                return transferService.create(transfer);
                
            } catch (error) {
                throw error;
            }
        }
    }
});