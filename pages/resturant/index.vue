<template>
  <div class="grid gap-5 bg-white p-5">
    <CarouselProductTags :productTags="productFoodsTags" />

    <h2 class="mb-5 text-2xl font-semibold">Resturant Nearby</h2>

    <div class="flex flex-wrap gap-4">
      <VendorNearby :vendor="vendor" v-for="vendor in nearbyFoodVendors" />
    </div>
    <h2 class="mb-5 text-2xl font-semibold">All Stores</h2>

    <div
      v-if="vendorLoadingStates.loadingVendors === true"
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

    <div
      v-else
      class="flex h-fit !max-w-[calc(100vw-300px)] items-center gap-x-2"
    >
      <UCarousel
        v-slot="{ item, index }"
        :items="vendors"
        class="mx-auto w-[95%] rounded-lg"
        :ui="{
          item: 'mx-2.5',
          container: 'rounded-lg',
        }"
      >
        <VendorCard :vendor="item" />
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";

definePageMeta({
  name: GP_ROUTES.RESTURANT.VENDORS,
});

import { useVendorStore } from "~/store/vendor.store";
const searchedTerm = ref("");
const { vendors, nearbyFoodVendors, vendorLoadingStates } =
  storeToRefs(useVendorStore());
const { productFoodsTags } = storeToRefs(useInteractionStore());
const filteredVendors = computed(() =>
  vendors.value.filter((vendor) =>
    vendor.publicName.toLowerCase().includes(searchedTerm.value.toLowerCase()),
  ),
);
</script>
