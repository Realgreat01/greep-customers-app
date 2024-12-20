<template>
  <UCard
    class="hide-scrollbar h-full overflow-y-scroll"
    :ui="{
      base: 'overflow-hidden flex flex-col h-full ',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>
    <div class="flex min-h-[90vh] flex-1 flex-col justify-between">
      <div class="hide-scrollbar h-full overflow-y-scroll pb-4 pt-0">
        <div
          class="flex h-12 w-full items-center justify-center gap-2 rounded-t-lg bg-green-500 p-4 text-center font-semibold text-white"
        >
          {{ selectedVendorCart?.vendor.publicName }}
        </div>
        <div class="mt-6 grid gap-2 p-4">
          <div
            class="grid gap-2"
            v-for="(product, index) in selectedVendorCart?.products"
          >
            <div class="flex items-start justify-start gap-2">
              <UAvatarGroup size="xl" square :max="4">
                <UAvatar
                  :src="product.product.banner.link"
                  class="border-2 border-white"
                  :ui="{ rounded: 'rounded-md' }"
                />
              </UAvatarGroup>
              <div class="text-sm">
                <h2 class="">{{ product.product.title }}</h2>
                <h2 class="font-semibold">
                  {{
                    gpNumbers.formatCurrency(
                      product.product.price.amount,
                      product.product.price.currency,
                    )
                  }}
                </h2>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <UButton
                label="Remove"
                icon="i-icon-trash"
                variant="ghost"
                color="red"
                @click="removeItemFromCart(product.productId, index)"
                class="text-sm font-normal"
                :ui="{ font: 'font-normal' }"
              />
              <div class="flex items-center justify-center gap-1">
                <UButton
                  @click="product.quantity > 1 && product.quantity--"
                  :disabled="product.quantity <= 1"
                  icon="i-icon-minus"
                  class="flex h-6 w-6 items-center justify-center bg-green-500 fill-white disabled:bg-green-500"
                />
                <UButton
                  variant="ghost"
                  class="!font-semibold"
                  :label="product.quantity.toString()"
                />
                <UButton
                  @click="product.quantity++"
                  icon="i-icon-plus"
                  class="flex h-6 w-6 items-center justify-center bg-green-500 fill-white"
                />
              </div>
            </div>
            <UDivider />
          </div>
        </div>
      </div>

      <div class="p-4">
        <UButton
          block
          color="green"
          class="h-12"
          @click="
            selectedVendorCart ? openCheckoutModal(selectedVendorCart) : null
          "
          :label="`Checkout (${selectedVendorCart?.products.length} items)`"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";
import type { VendorCartEntity } from "~/types/product";

defineProps({
  vendorCart: {
    type: [Object || null] as PropType<VendorCartEntity | null>,
    required: true,
  },
});

const { selectedVendorCart } = storeToRefs(useProductStore());
const productStore = useProductStore();
const emit = defineEmits(["openCheckoutModal", "openFullCartsModal", "close"]);
const openCheckoutModal = (cart: VendorCartEntity) => {
  productStore.selectVendorCart(cart);
  emit("openCheckoutModal");
};

const removeItemFromCart = (productId: string, productIndex: number) => {
  productStore.removeItemFromCart(productId, productIndex);
  if (selectedVendorCart.value?.products.length === 0) {
    emit("close");
  }
};
</script>

<style scoped></style>
