<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  min-height: 100vh;

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 90rem;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
