<template>
  <div class="ml-12 h-fit !max-w-[calc(100vw-380px)]">
    <UCarousel
      v-slot="{ item }"
      :items="promotions"
      class="rounded-lg"
      :ui="{
        item: 'mr-4',
        wrapper: '',
        container:
          'relative w-full flex overflow-x-scroll  snap-x snap-mandatory scroll-smooth',
      }"
      :prev-button="{
        color: 'gray',
        icon: 'i-icon-carousel-left',
        class: '-start-12 -mt-2.5',
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-icon-carousel-right',
        class: '-end-12 -mt-2.5',
      }"
      arrows
    >
      <img :src="item" alt="" width="440" height="400" />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
const promotions = ref(["/images/promotion.png", "/images/promotion.png"]);
</script>

<style scoped></style>
