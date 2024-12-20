<template>
  <div class="grid gap-8">
    <div
      class="mx-auto flex w-[94%] items-center rounded-full border-2 bg-white"
    >
      <UInput
        icon="i-icon-search-icon"
        size="lg"
        class="flex-1"
        color="white"
        :trailing="false"
        variant="none"
        v-model="searchedTerm"
        placeholder="Search"
      />
    </div>

    <CarouselProductTags :productTags="productTags" />

    <ProductPromos />

    <div class="ml-2 bg-[#0092600D] p-5">
      <CarouselProducts :products="foodProducts" />
    </div>

    <div class="ml-2 p-5">
      <CarouselProducts
        :products="latestProducts"
        :delay="500"
        title="Trending Products"
      />
    </div>

    <div class="ml-2 p-5">
      <CarouselProducts
        :products="mostSoldProducts"
        :delay="250"
        title="Latest Products"
      />
    </div>

    <div class="-mt-5 ml-2 bg-white p-5">
      <CarouselVendors :vendors="vendors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInteractionStore } from "~/store/interactions.store";
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";
const { vendors } = storeToRefs(useVendorStore());
const { foodProducts, mostSoldProducts, latestProducts } =
  storeToRefs(useProductStore());
const { productTags } = storeToRefs(useInteractionStore());

const searchedTerm = ref("");
</script>

<style scoped></style>
