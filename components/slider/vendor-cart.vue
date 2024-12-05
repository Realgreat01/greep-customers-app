<template>
  <UCard
    :ui="{
      base: 'overflow-hidden  h-full grid gap-2',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <div class="flex h-full flex-1 flex-col justify-between">
      <div class="hide-scrollbar h-[95%] overflow-y-scroll pb-4 pt-0">
        <h2
          class="flex h-12 w-full items-center justify-center gap-2 bg-green-500 p-4 text-center font-semibold text-white"
        >
          {{ selectedVendorCart?.vendor.publicName }}
        </h2>
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
                @click="selectedVendorCart?.products.splice(index, 1)"
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
import { useVendorStore } from "~/store/vendor.store";
import type { VendorCartEntity } from "~/types/product";

defineProps({
  vendorCart: {
    type: [Object || null] as PropType<VendorCartEntity | null>,
    required: true,
  },
});

const { vendorCarts, selectedVendorCart } = storeToRefs(useVendorStore());
const vendorStore = useVendorStore();
const emits = defineEmits(["openCheckoutModal", "openFullCartsModal"]);
const openCheckoutModal = (cart: VendorCartEntity) => {
  vendorStore.selectVendorCart(cart);
  emits("openCheckoutModal");
};
</script>

<style scoped></style>
