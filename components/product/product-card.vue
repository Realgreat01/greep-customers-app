<template>
  <UCard
    class="w-80 p-0"
    :ui="{
      base: 'overflow-hidden grid gap-2',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <img
      :src="product?.banner.link ?? '/blank.png'"
      alt=""
      class="block h-40 w-full object-cover object-[50%]"
    />
    <div class="grid gap-2 p-2">
      <h2 class="font-bold">{{ product?.title }}</h2>
      <p class="h-16 text-sm text-gray-400">
        {{ gpHelpers.sliceWords(product?.description, 100) }}
      </p>
      <UDivider class="" />

      <h2 class="text-xs text-gray-400">
        Price:
        <span class="text-primary text-sm font-semibold">{{
          gpNumbers.formatCurrency(
            product?.price.amount,
            product?.price.currency,
          )
        }}</span>
      </h2>

      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center gap-1">
          <UButton
            @click="quantity > 1 && quantity--"
            :disabled="quantity <= 1"
            icon="i-icon-minus"
            class="flex h-6 w-6 items-center justify-center bg-green-500 fill-white disabled:bg-green-500"
          />
          <UButton
            variant="ghost"
            class="!font-semibold"
            :label="quantity.toString()"
          />
          <UButton
            @click="quantity++"
            icon="i-icon-plus"
            class="flex h-6 w-6 items-center justify-center bg-green-500 fill-white"
          />
        </div>

        <UButton
          label="Add To Cart"
          icon="i-icon-shopping-cart"
          :disabled="cart.some((cart) => cart.productId === product.id)"
          @click="addToCart"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useUtilsStore } from "~/store/utils.store";
import { useVendorStore } from "~/store/vendor.store";
import type { ProductEntity } from "~/types/product";

const props = defineProps({
  product: {
    type: Object as PropType<ProductEntity>,
    required: true,
  },
});
const router = useRouter();
const toast = useToast();
const vendorStore = useVendorStore();
const { cart } = storeToRefs(useVendorStore());
const { remarksModal, orderDetailsModal } = storeToRefs(useUtilsStore());
const { isLoggedIn } = storeToRefs(useAuthStore());

const quantity = ref(1);

const addToCart = () => {
  if (isLoggedIn.value === true) {
    toast.add({ title: "Item added to cart succesfully!", color: "green" });
    vendorStore.addToCart(props.product, quantity.value);
  } else
    navigateTo(
      { name: GP_ROUTES.LOGIN, replace: true },
      { replace: true, redirectCode: 401 },
    );
};
</script>

<style scoped></style>
