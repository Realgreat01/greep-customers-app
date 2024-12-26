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
            <div class="flex w-full items-start justify-between gap-2">
              <div class="flex w-full items-start gap-2">
                <UAvatarGroup size="xl" square :max="4">
                  <UAvatar
                    :src="product.product.banner.link"
                    class="border-2 border-white"
                    :ui="{ rounded: 'rounded-md' }"
                  />
                </UAvatarGroup>
                <div class="w-full text-sm">
                  <div class="flex w-full items-start justify-between">
                    <div class="">
                      <h2 class="">{{ product.product.title }}</h2>
                      <h2 class="text-sm font-semibold">
                        {{
                          gpNumbers.formatCurrency(
                            product.product.price.amount,
                            product.product.price.currency,
                          )
                        }}
                      </h2>
                    </div>
                    <h2 class="ml-auto text-base font-semibold">
                      <span class="">Total : </span>
                      {{
                        gpNumbers.formatCurrency(
                          getTotalPrice(product.product, product.quantity)
                            .amount,
                          getTotalPrice(product.product, product.quantity)
                            .currency,
                        )
                      }}
                    </h2>
                  </div>
                  <div
                    class=""
                    v-if="
                      product.product?.selectedAddOns &&
                      product.product?.selectedAddOns.length > 0
                    "
                  >
                    <!-- <h2 class="text-xs font-semibold">Extra AddOns</h2> -->
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                        variant="soft"
                        color="green"
                        class="flex min-w-fit flex-wrap gap-2 whitespace-nowrap p-[2px] px-2 text-xs"
                        v-for="(addOn, index) in product.product.selectedAddOns"
                      >
                        <h2 class="first-letter:capitalize">
                          {{ addOn.itemName }}
                        </h2>

                        <h2 class="">
                          ({{
                            gpNumbers.formatCurrency(
                              addOn.price.amount,
                              addOn.price.currency,
                            )
                          }}
                          x {{ addOn.quantity }})
                        </h2>
                      </UBadge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <UButton
                label="Remove"
                icon="i-icon-trash"
                variant="ghost"
                color="red"
                @click="removeItemFromCart(product.productId)"
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
import { usePaymentStore } from "~/store/payment.store";
import { useProductStore } from "~/store/product.store";
import type { Price, ProductEntity, VendorCartEntity } from "~/types/product";

defineProps({
  vendorCart: {
    type: [Object || null] as PropType<VendorCartEntity | null>,
    required: true,
  },
});

const { selectedVendorCart } = storeToRefs(useProductStore());
const productStore = useProductStore();
const paymentStore = usePaymentStore();

const emit = defineEmits(["openCheckoutModal", "openFullCartsModal", "close"]);
const openCheckoutModal = (cart: VendorCartEntity) => {
  productStore.selectVendorCart(cart);
  emit("openCheckoutModal");
};

const removeItemFromCart = (productId: string) => {
  productStore.removeItemFromCart(productId);
  if (selectedVendorCart.value?.products.length === 0) {
    emit("close");
  }
};

const getTotalPrice: Price[] | any = (
  product: ProductEntity,
  quantity: number,
) => {
  const selectedAddonsPrice = () => {
    if (product.selectedAddOns) {
      return product.selectedAddOns.map((addon) => ({
        amount: addon.price.amount * addon.quantity,
        currency: addon.price.currency,
      }));
    } else {
      return [
        {
          amount: 0,
          currency: product.price.currency,
        },
      ];
    }
  };

  let total = paymentStore.getTotalProductCost([
    {
      amount: product.price.amount * quantity,
      currency: product.price.currency,
    },
    ...selectedAddonsPrice(),
  ]);
  return total;
};
</script>

<style scoped></style>
