<script setup lang="ts">
const emit = defineEmits(['update:current-page']);
const props = defineProps<{
  itemsPerPage: number
  totalItems: number
  currentPage: number
}>();

const currentPage = toRef(props, 'currentPage');
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const goToPrevious = () => {
  if (currentPage.value > 1) {
    emit('update:current-page', currentPage.value - 1);
  }
};

const goToNext = () => {
  if (currentPage.value < totalPages.value) {
    emit('update:current-page', currentPage.value + 1);
  }
};

const goTo = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:current-page', page);
  }
};
</script>

<template>
  <div class="ui-pagination">
    <button class="ui-pagination__action"
            aria-label="назад"
            :disabled="currentPage === 1"
            @click="goToPrevious">
      &lt;
    </button>
    <span
        v-for="page in totalPages"
        :key="page"
        class="ui-pagination__page"
        :class="{'ui-pagination__page--active': page === currentPage }"
        @click="goTo(page)"
    >
      {{ page }}
    </span>
    <button
        class="ui-pagination__action"
        aria-label="вперед"
        :disabled="currentPage === totalPages"
        @click="goToNext">
      &gt;
    </button>
  </div>
</template>

<style scoped lang="scss">
.ui-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  &__action,
  &__page {
    cursor: pointer;
    padding: .8rem 1.2rem;
    border-radius: 4px;
    background-color: hsl(0, 0%, 95%);
    border: .1rem solid hsl(0, 0%, 85%);
  }

  &__action {
    &:hover {
      &:not(&:disabled) {
        background-color: hsl(0, 0%, 85%);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__page {
    &--active {
      background-color: hsl(204, 66%, 47%);
      color: hsl(0, 0%, 100%);
    }
  }
}
</style>
