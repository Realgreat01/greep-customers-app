<template>
  <div class="grid gap-10 bg-white p-5">
    <div class="mx-auto mt-3 w-[94%]">
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

    <div class="grid gap-1">
      <h2 class="text-xl font-semibold">Resturants</h2>
      <CarouselProductTags :productTags="productFoodsTags" />
    </div>

    <div class="grid gap-1">
      <h2 class="mb-2 flex items-center gap-x-2 text-xl font-semibold">
        <UIcon name="i-icon-landmark" />Resturants near you
      </h2>
      <div class="flex flex-wrap gap-4">
        <VendorNearby :vendor="vendor" v-for="vendor in nearbyFoodVendors" />
      </div>
    </div>

    <CarouselVendors :vendors="vendors" title="All Resturants" />
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
