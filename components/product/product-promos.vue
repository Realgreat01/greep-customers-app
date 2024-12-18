<template>
  <div class="flex h-fit !max-w-[calc(100vw-280px)] items-center gap-x-2">
    <UCarousel
      v-slot="{ item }"
      :items="promotions"
      class="mx-auto w-[90%] rounded-lg"
      :ui="{
        item: 'mx-2.5',
        container: 'rounded-lg',
      }"
      :prev-button="{
        color: 'gray',
        icon: 'i-icon-carousel-left',
        class: '-start-12',
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-icon-carousel-right',
        class: '-end-12',
      }"
      arrows
    >
      <img :src="item" alt="" width="420" height="168" />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
const promotions = ref(["/images/promotion.png", "/images/promotion.png"]);
</script>

<style scoped></style>
