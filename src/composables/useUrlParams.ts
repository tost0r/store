type QueryParams = Record<string, string>;
export const addQueryParams = (queryParams: QueryParams): void => {
    const router = useRouter();
    const route = useRoute();

    const newQuery = { ...route.query, ...queryParams };

    for(const query in newQuery) {
        if (!newQuery[query]) {
            delete newQuery[query];
        }
    }

    router.replace({ query: newQuery });
}
