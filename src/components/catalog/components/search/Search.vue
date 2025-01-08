<script setup lang="ts">
import type {Product} from '~/components/catalog/types/interfaces';
import debounce from 'lodash.debounce';
import { useCatalogStore } from '~/components/catalog/store';
import {addQueryParams} from "~/composables/useUrlParams";

const deepSearch = (arrayOfObjects: Product[], searchTerm: string): Product[] => {
  function matchesObject(obj: Product, term: string) {
    const keys = Object.keys(obj);

    for (let key of keys) {
      let value = obj[key];
      if (typeof value === 'object' && value !== null) {
        if (matchesObject(value, term)) {
          return true;
        }
      } else if (value.toString().toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  return arrayOfObjects.filter((obj) => matchesObject(obj, searchTerm));
}
const route = useRoute();
const catalogStore = useCatalogStore();
const inputValue = ref<string>('');
const setProducts = (value: string): void => {
  catalogStore.setSearchProduct(deepSearch(catalogStore.products, value));
}
const handleInput = debounce(() => {
  setProducts(inputValue.value);
  addQueryParams({'search': `${inputValue.value}`});
},500);
const inputCacheValue = (): void => {
  if (route.query.search) {
    const searchValue = route.query.search as string;

    inputValue.value = searchValue;
    setProducts(searchValue);
  }
}

inputCacheValue();
</script>

<template>
<div class="search">
  <input
      class="search__field"
      type="text"
      placeholder="Поиск"
      v-model="inputValue" @input="handleInput"
  >
</div>
</template>

<style scoped lang="scss">
.search {
  &__field {
    border-radius: .4rem;
    padding: 1rem;
    background-color: var(--tertiary-color);
  }
}
</style>
