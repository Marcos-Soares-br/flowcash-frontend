export const useModal = () => {
    const modal = useState('modal', () => ({
        name: null as string | null,
        props: {}
    }));

    function open(name: string, props = {}) {
        modal.value = { name, props };
    }

    function close() {
        modal.value = { name: null, props: {} };
    }

    return {
        modal,
        open,
        close
    };
};