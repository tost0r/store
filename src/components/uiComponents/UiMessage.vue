<template>
  <div class="ui-message">
    <p class="ui-message__text">
      <slot></slot>
    </p>
  </div>
</template>

<style scoped lang="scss">
.ui-message {
  padding: 3rem;

  &__text {
    font-weight: 900;

    @media screen and (min-width: 1025px) {
      font-size: 2.8rem;
      line-height: 3rem;
    }

    @media screen and (max-width: 1024px) {
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }
}
</style>
