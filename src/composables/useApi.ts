import axios from 'axios';

export const useFetch = <T>(api: () => Promise<{ data: T }>): {
    data: Ref<T>;
    isError: Ref<boolean>;
    isLoading: Ref<boolean>;
    errResponseData: Ref<Record<string, string>>;
    fetchData: () => Promise<void>;
} => {
    const data = ref([]) as Ref<T>;
    const isError = ref<boolean>(false);
    const errResponseData =  ref<Record<string, string>>({});
    const isLoading = ref<boolean>(false);

    const fetchData = async (): Promise<void> => {
        isLoading.value = true;

        try {
            const response = await api();
            data.value = response.data;
        } catch (err) {
            isError.value = true;

            if (axios.isAxiosError(err)) {
                console.error(err.message, err);
                errResponseData.value = err.response?.data ?? {};
            } else {
                throw new Error('Ошибка при получении данных');
            }
        } finally {
            isLoading.value = false;
        }
    };

    return { data, isError, isLoading, errResponseData, fetchData };
};
