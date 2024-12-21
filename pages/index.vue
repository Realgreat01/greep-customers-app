<template>
  <div class="grid gap-0">
    <div class="mx-auto mt-2 w-[94%] p-5">
      <UInput
        icon="i-icon-search-icon"
        size="xl"
        class="flex-1"
        color="white"
        :trailing="false"
        :ui="{ rounded: 'rounded-full' }"
        v-model="searchedTerm"
        placeholder="Search"
      />
    </div>

    <div class="mr-4 p-5">
      <CarouselProductTags :productTags="productTags" />
    </div>

    <div class="mb-5 mr-4 p-5">
      <CarouselProductPromos />
    </div>

    <div class="bg-[#0092600D] p-5">
      <CarouselProducts :products="foodProducts" />
    </div>

    <div class="p-5">
      <CarouselProducts
        :products="latestProducts"
        :delay="500"
        title="Trending Products"
      />
    </div>

    <div class="p-5">
      <CarouselProducts
        :products="mostSoldProducts"
        :delay="250"
        title="Latest Products"
      />
    </div>

    <div class="bg-white p-5">
      <CarouselVendors :vendors="vendors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.HOME,
});

const { vendors } = storeToRefs(useVendorStore());
const { foodProducts, mostSoldProducts, latestProducts } =
  storeToRefs(useProductStore());
const { productTags } = storeToRefs(useInteractionStore());

const searchedTerm = ref("");
</script>

<style scoped></style>
