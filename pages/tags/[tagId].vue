<template>
  <div>
    <ProductTags />
    <h2
      class="p-4 font-semibold capitalize"
      v-if="productsByTag !== null && productsByTag.tag"
    >
      {{ productsByTag?.tag?.title }}
    </h2>
    <div class="flex flex-wrap gap-5">
      <ProductCard v-for="product in productsByTag?.products" :product />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";
import { GP_ROUTES } from "~/constants/routes";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.PRODUCTS_TAG,
});

const productStore = useProductStore();
const { productsByTag } = storeToRefs(useProductStore());

const route = useRoute();
onBeforeMount(async () => {
  await productStore.getProductsByTag(route.params.tagId as string);
});
</script>

<style scoped></style>
