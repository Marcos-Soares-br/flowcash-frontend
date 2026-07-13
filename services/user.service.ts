export const userService = {
    async resetData() {
        const api = useApi();

        return await api<{ message: string }>(`/users/reset`, {
            method: 'DELETE'
        });
    },
};