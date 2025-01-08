import {defineStore} from 'pinia'
import type {Product, ViewModeGrid} from '~/components/catalog/types/interfaces';

export const useCatalogStore = defineStore('catalog', () => {
    const products = ref<Product[]>([]);
    const searchProduct = ref<Product[]>([]);
    const modeGridProducts = ref<ViewModeGrid | undefined>();

    const setProducts = (newProducts: Ref<Product[]>): void => {
        products.value = unref(newProducts);
    }

    const setModeGridProducts = (newMode: ViewModeGrid): void => {
        modeGridProducts.value = newMode;
    }

    const setSearchProduct = (newValue: Product[]): void => {
        searchProduct.value = newValue;
    }

    return {
        products,
        setProducts,
        modeGridProducts,
        setModeGridProducts,
        searchProduct,
        setSearchProduct
    }
})
