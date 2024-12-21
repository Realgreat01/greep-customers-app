<template>
  <div class="grid gap-8 p-5">
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
    <CarouselProductTags :productTags="productTags" />
    <div class="grid gap-2" v-if="productsByTag !== null && productsByTag.tag">
      <h2 class="text-xl font-semibold capitalize">
        {{ productsByTag?.tag?.title }} ({{ productsByTag.products.length }}
        results)
      </h2>
      <div class="flex flex-wrap gap-5" v-if="productsByTag.products.length">
        <ProductCard v-for="product in productsByTag?.products" :product />
      </div>
      <BaseEmptyList message="No item for this category" hide-button v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.PRODUCTS_TAG,
});

const productStore = useProductStore();
const { productsByTag } = storeToRefs(useProductStore());
const { productTags, interactionLoadingState } = storeToRefs(
  useInteractionStore(),
);
const route = useRoute();

const searchedTerm = ref("");
onBeforeMount(async () => {
  await productStore.getProductsByTag(route.params.tagId as string);
});
</script>

<style scoped></style>
