<template>
  <div class="grid gap-6 py-16 lg:px-24">
    <h2
      class="green-gradient-text mx-auto w-fit bg-clip-text text-center text-xl font-bold text-transparent lg:text-4xl"
    >
      Search for the Best Vendors <br />
      for your Delicious Menus!
    </h2>
    <div
      class="mx-auto flex w-full items-center rounded-full border-2 bg-white pl-2 lg:w-1/2"
    >
      <UInput
        icon="i-icon-search-icon"
        size="sm"
        class="flex-1"
        color="white"
        :trailing="false"
        variant="none"
        v-model="searchedTerm"
        placeholder="Search..."
      />
      <div class="flex h-12 items-center border-l-2">
        <USelectMenu
          variant="none"
          class="w-28 lg:w-32"
          value-attribute="type"
          v-model="selectedCategory"
          :options="categories"
          placeholder="Category"
        />
      </div>
      <UButton
        class="!h-12 rounded-r-full lg:pr-6"
        :ui="{ rounded: 'rounded-none' }"
      >
        <UIcon name="i-icon-jelly-search" class="h-6 w-6" />
        <span class="hidden lg:block">Search</span>
      </UButton>
    </div>

    <div class="py-5 lg:py-10">
      <h2 class="my-5 text-2xl font-bold">Vendors</h2>

      <div
        v-if="vendorLoadingStates.loadingVendors === true"
        class="flex flex-wrap justify-center gap-5 lg:justify-start"
      >
        <UCard class="grid w-[320px] gap-4" v-for="i in 12">
          <USkeleton class="h-32 w-full" />
          <USkeleton class="my-2 h-4 w-[80%]" />
          <USkeleton class="my-2 h-10" />
          <div class="flex items-center justify-between">
            <USkeleton class="h-6 w-20" v-for="i in 2" />
          </div>
        </UCard>
      </div>
      <BaseEmptyList
        v-else-if="filteredVendors.length === 0"
        message="No vendor found"
        hideButton
      />
      <div v-else class="flex flex-wrap justify-center gap-5 lg:justify-start">
        <VendorCard v-for="vendor in filteredVendors" :vendor />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVendorStore } from "~/store/vendor.store";
const searchedTerm = ref("");
const { vendors, vendorLoadingStates } = storeToRefs(useVendorStore());
const categories = ref([
  { type: "", label: "All Vendors" },
  { type: "foods", label: "Foods" },
  { type: "items", label: "Market" },
]);
const selectedCategory = ref("");

const filteredVendors = computed(() =>
  vendors.value
    .filter((vendor) =>
      vendor.publicName
        .toLowerCase()
        .includes(searchedTerm.value.toLowerCase()),
    )
    .filter((vendor) =>
      vendor.type.vendorType.includes(selectedCategory.value),
    ),
);
</script>

<style scoped></style>
