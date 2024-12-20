<template>
  <h2 class="mb-5 text-2xl font-semibold">
    {{ title }} &nbsp;
    <UIcon name="i-icon-arrow-right" class="h-5 w-5" />
  </h2>

  <div
    v-if="productLoadingStates.loadingProducts === true"
    class="flex flex-wrap justify-center gap-2 lg:justify-start"
  >
    <UCard class="grid w-[280px] gap-4" v-for="i in 3">
      <USkeleton class="h-32 w-full" />
      <USkeleton class="my-2 h-4 w-[80%]" />
      <div class="flex items-center justify-between">
        <USkeleton class="h-4 w-20" v-for="i in 2" />
      </div>
    </UCard>
  </div>
  <BaseEmptyList
    v-else-if="filteredVendors.length === 0"
    message="No vendor found"
    hideButton
  />

  <div v-else class="flex h-fit !max-w-[980px] items-center gap-x-2">
    <UCarousel
      ref="productsCarousel"
      v-slot="{ item }"
      :items="products"
      class="mx-auto w-[100%] rounded-lg"
      :ui="{
        item: 'mx-2.5',
        container: 'rounded-lg',
      }"
    >
      <ProductCard :product="item" />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import { useInteractionStore } from "~/store/interactions.store";
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";
import type { ProductEntity } from "~/types/product";

const props = defineProps({
  products: {
    type: Array as PropType<ProductEntity[]>,
    required: true,
  },
  title: { type: String, default: "Breakfast of the Day" },
  delay: {
    type: Number,
    default: 0,
  },
});

const searchedTerm = ref("");
const { vendors } = storeToRefs(useVendorStore());
const { productLoadingStates } = storeToRefs(useProductStore());

const filteredVendors = computed(() =>
  props.products.filter((product) =>
    product.title.toLowerCase().includes(searchedTerm.value.toLowerCase()),
  ),
);

const productsCarousel = ref();

onMounted(() => {
  setInterval(() => {
    if (!productsCarousel.value) return;

    if (productsCarousel.value.page === productsCarousel.value.pages) {
      return productsCarousel.value.select(0);
    }

    productsCarousel.value.next();
  }, 2000 + props.delay);
});
</script>

<style scoped></style>
