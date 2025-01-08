<script setup lang="ts">
import Search from '~/components/catalog/components/search/Search.vue';
import ProductsGrid from '~/components/catalog/components/productsGrid/ProductsGrid.vue';
import UiMessage from '~/components/uiComponents/UiMessage.vue';
import UiPagination from '~/components/uiComponents/UiPagination.vue';
import {getAllProducts} from '~/components/catalog/api';
import type {Product} from '~/components/catalog/types/interfaces';
import {useCatalogStore} from '~/components/catalog/store';
import {useFetch} from '~/composables/useApi';
import {addQueryParams} from '~/composables/useUrlParams';

const {data, isError, isLoading, fetchData}:
    {
      data: Ref<Product[]>,
      isError: Ref<boolean>,
      isLoading: Ref<boolean>,
      fetchData: () => Promise<void>
    } = useFetch(getAllProducts);

const route = useRoute();
const catalogStore = useCatalogStore();
const pageSize = 9;
const currentPage = ref(1);
const resultArrayProduct = ref<Product[]>([]);
const currentArrayProduct = ref<Product[]>([]);
const totalProduct = ref<number>(0);
const isShowPaginate = computed(() => unref(totalProduct) > pageSize);
const paginateArray = (arr: Product[], perPage: number, currentPage: number) => {
  const startIndex = (currentPage - 1) * perPage;

  resultArrayProduct.value = arr.slice(startIndex, startIndex + perPage);
}

const onClickPagination = (page: number) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  paginateArray(unref(currentArrayProduct), pageSize, page);
  addQueryParams({'page': `${page}`});
  currentPage.value = page;
};

const updateCurrentProducts = (isSearch?: boolean) => {
  currentArrayProduct.value = route.query.search ? unref(catalogStore.searchProduct) : unref(data);
  totalProduct.value = unref(currentArrayProduct).length;

  if (Boolean(route.query.page)
      && Number(route.query.page) <= Math.ceil(unref(currentArrayProduct).length / pageSize)
      && !isSearch
  ) {
    currentPage.value = Number(route.query.page);
  } else {
    currentPage.value = 1;
    addQueryParams({'page': '1'});
  }
  paginateArray(unref(currentArrayProduct), pageSize, currentPage.value);
}

watch([data, () => catalogStore.searchProduct], () => {
  catalogStore.setProducts(data);
  updateCurrentProducts();
})

watch(() => route.query.search, () => {
  updateCurrentProducts(true);
})

fetchData();
</script>

<template>
  <section class="homepage">
    <UiMessage
        v-if="isLoading"
        class="homepage__massage"
    >
      Загрузка...
    </UiMessage>
    <UiMessage
        v-else-if="isError"
        class="homepage__massage"
    >
      Произошла ошибка при загрузке :(
    </UiMessage>
    <div
        v-else
        class="homepage__content"
    >
      <div class="homepage__top-panel">
        <Search/>
      </div>
      <UiMessage
          v-if="!resultArrayProduct.length"
          class="homepage__massage"
      >
        Ничего не найдено
      </UiMessage>
      <ProductsGrid
          v-else
          :products="resultArrayProduct"
          class="homepage__grid"
      />
      <UiPagination
          v-if="isShowPaginate"
          :totalItems="totalProduct"
          :itemsPerPage="pageSize"
          :currentPage="currentPage"
          @update:currentPage="onClickPagination"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.homepage {
  padding: 3rem 2rem;

  &,
  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  }

  &__massage {
    margin-right: auto;
    margin-left: auto;
  }

  &__top-panel {
    display: flex;
    width: 100%;
    margin-bottom: 3.2rem;
  }

  &__grid {
    width: 100%;
    margin-bottom: 4.8rem;
  }

  &__pagination {
    margin-top: auto;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
