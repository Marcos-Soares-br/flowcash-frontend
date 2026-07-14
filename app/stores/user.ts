import { userService } from "../../services/user.service";

export const useUserStore = defineStore('user', {
    actions: {
        async resetData() {
            return await userService.resetData();
        }
    }
});