<template>
  <UCard
    @click="selectProduct"
    class="w-80 p-0"
    :ui="{
      base: 'overflow-hidden grid gap-2',
      body: {
        padding: 'px-4 py-3 sm:p-4',
      },
    }"
  >
    <img
      :src="product?.banner.link ?? '/blank.png'"
      alt=""
      class="mb-2 block h-40 w-full rounded-t-lg object-cover object-[50%]"
    />
    <div class="grid gap-2">
      <h2 class="font-bold">{{ product?.title }}</h2>
      <UDivider class="" />

      <div class="flex justify-between text-xs text-gray-400">
        <h2 class="">
          Starts from
          <span class="font-medium">
            &nbsp;
            {{
              gpNumbers.formatCurrency(
                product?.price.amount,
                product?.price.currency,
              )
            }}</span
          >
        </h2>

        <h2
          class="flex items-center gap-x-2"
          v-if="product.data.type === 'foods'"
        >
          <UIcon name="i-icon-time" class="h-4 w-4" />
          {{ product.data.prepTimeInMins.from }} —
          {{ product.data.prepTimeInMins.to }} mins
        </h2>
      </div>
    </div>
    <USlideover v-model="openProductPreview" class="z-[2000]">
      <SliderProductPreview />
    </USlideover>
  </UCard>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useProductStore } from "~/store/product.store";
import type { ProductEntity } from "~/types/product";

const props = defineProps({
  product: {
    type: Object as PropType<ProductEntity>,
    required: true,
  },
});

const toast = useToast();
const productStore = useProductStore();
const { cart } = storeToRefs(useProductStore());
const { isLoggedIn } = storeToRefs(useAuthStore());

const openProductPreview = ref(false);
const quantity = ref(1);

const selectProduct = () => {
  openProductPreview.value = true;
  productStore.selectProduct(props.product);
};

const addToCart = () => {
  if (isLoggedIn.value === true) {
    toast.add({ title: "Item added to cart succesfully!", color: "green" });
    productStore.addToCart(props.product, quantity.value);
  } else
    navigateTo(
      { name: GP_ROUTES.LOGIN, replace: true },
      { replace: true, redirectCode: 401 },
    );
};
</script>

<style scoped></style>
