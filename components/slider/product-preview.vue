<template>
  <UCard
    class="hide-scrollbar h-full overflow-y-scroll"
    :ui="{ divide: 'divide-white h-full ', body: { padding: 'px-0 sm:p-0' } }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-4 w-4 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>

    <div class="flex h-full flex-col" v-if="product">
      <img
        :src="product?.banner.link ?? '/blank.png'"
        alt=""
        class="h-40 w-full rounded-t-xl object-cover object-center"
      />

      <div class="flex min-h-[62vh] flex-col justify-between p-4">
        <div class="">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">{{ product?.title }}</h2>
            <UIcon name="i-icon-favorite" class="h-5 w-5" />
          </div>

          <div class="flex items-center justify-between">
            <h2 class="text-gray-500">
              <span class="font-semibold">{{
                gpNumbers.formatCurrency(
                  product?.price.amount,
                  product?.price.currency,
                )
              }}</span>
            </h2>
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
          </div>

          <p class="my-5 max-w-[80%] text-sm text-gray-400">
            {{ product.description }}
          </p>

          <div class="my-4 mb-10" v-if="product.data.type === 'foods'">
            <h2
              class="text-base font-medium"
              v-if="Object.keys(product.addOns).length > 0"
            >
              Extra Add on
            </h2>
            <div
              class="mb-2"
              v-for="[addOnTitle, addOnProperty] in Object.entries(
                product.addOns,
              )"
            >
              <h2 class="text-sm font-medium first-letter:capitalize">
                {{ addOnTitle }}
              </h2>
              <h2
                class="text-xs font-normal text-red-500"
                v-if="addOnProperty.minSelection > 0"
              >
                * Required
                <span class="font-medium text-gray-400"
                  >Select at least ({{ addOnProperty.minSelection }})</span
                >
              </h2>
              <h2 class="text-xs font-normal text-gray-400" v-else>Optional</h2>
              <div class="grid gap-1">
                <div
                  class="rounded-lg p-2 pb-0"
                  :class="{
                    'bg-gray-100 font-semibold': checkSelectedAddons(
                      addOnTitle,
                      item,
                    ),
                  }"
                  v-for="[item, property] in Object.entries(
                    addOnProperty.items,
                  )"
                >
                  <div class="ml-10 flex items-start justify-between text-sm">
                    <h2 class="first-letter:capitalize">
                      {{ item }}
                    </h2>
                    <div class="flex flex-col justify-end gap-x-1">
                      <div class="flex justify-end gap-x-3">
                        <h2 class="">
                          {{
                            gpNumbers.formatCurrency(
                              property.price.amount,
                              property.price.currency,
                            )
                          }}
                        </h2>

                        <UCheckbox
                          color="green"
                          :ui="{ base: 'h-5 w-5', rounded: 'rounded-full' }"
                          :model-value="checkSelectedAddons(addOnTitle, item)"
                          @change="
                            selectAddons(
                              addOnTitle,
                              item,
                              property.price,
                              property.quantity ?? 1,
                            )
                          "
                        />
                      </div>
                      <div
                        class="flex items-center justify-center gap-1"
                        v-if="property.quantity"
                      >
                        <UButton
                          @click="
                            property.quantity > 1 && property.quantity--;
                            removeAddon(addOnTitle, item);
                          "
                          :disabled="property.quantity <= 1"
                          icon="i-icon-minus"
                          color="white"
                          class="flex h-5 w-5 items-center justify-center"
                        />
                        <UButton
                          variant="ghost"
                          class="flex w-10 justify-center text-center !font-semibold"
                          :label="property.quantity.toString()"
                        />
                        <UButton
                          @click="
                            property.quantity++;
                            removeAddon(addOnTitle, item);
                          "
                          icon="i-icon-plus"
                          color="white"
                          class="flex h-5 w-5 items-center justify-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UButton
          :label="`Add To Cart (${gpNumbers.formatCurrency(getTotalPrice.amount, getTotalPrice.currency)})`"
          block
          color="green"
          size="lg"
          class="justify-self-end"
          icon="i-icon-shopping-cart"
          :disabled="cart.some((cart) => cart.productId === product?.id)"
          @click="addToCart"
        />
        <!-- v-if="!cart.some((cart) => cart.productId === product?.id)" -->

        <!-- <UButton
          label="Remove Item "
          block
          color="red"
          size="xl"
          class="justify-self-end opacity-25"
          icon="i-icon-shopping-cart"
          v-if="cart.some((cart) => cart.productId === product?.id)"
          :disabled="!cart.some((cart) => cart.productId === product?.id)"
          @click="productStore.removeItemFromCart(product.id)"
        /> -->
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { usePaymentStore } from "~/store/payment.store";
import { useProductStore } from "~/store/product.store";
import { Currency } from "~/types/enums";
import type { Price, ProductEntity } from "~/types/product";

const toast = useToast();
const { selectedProduct: product, cart } = storeToRefs(useProductStore());
const productStore = useProductStore();
const paymentStore = usePaymentStore();

const emit = defineEmits(["openFullCartsModal", "close"]);
const quantity = ref(1);
const selectedAddons = ref<ProductEntity["selectedAddOns"]>([]);

const addToCart = () => {
  if (product.value) {
    toast.add({ title: "Item added to cart succesfully!", color: "green" });
    productStore.addToCart(product.value, quantity.value);
  }
};

const selectAddons = (
  groupName: string,
  itemName: string,
  price: Price,
  quantity: number,
) => {
  const addOn = selectedAddons.value.find(
    (item) => item.groupName === groupName && item.itemName === itemName,
  );
  if (!addOn) {
    selectedAddons.value.push({ groupName, itemName, price, quantity });
  } else {
    selectedAddons.value = selectedAddons.value.filter(
      (item) => item.groupName !== groupName || item.itemName !== itemName,
    );
  }
  if (product.value) product.value.selectedAddOns = selectedAddons.value;
};

const removeAddon = (groupName: string, itemName: string) => {
  selectedAddons.value = selectedAddons.value.filter(
    (item) => item.groupName !== groupName || item.itemName !== itemName,
  );
  if (product.value) product.value.selectedAddOns = selectedAddons.value;
};

const checkSelectedAddons = (groupName: string, itemName: string) => {
  return selectedAddons.value.some(
    (item) => item.groupName === groupName && item.itemName === itemName,
  );
};

const getTotalPrice = computed(() => {
  if (product.value) {
    let total = paymentStore.getTotalProductCost([
      {
        amount: product.value.price.amount * quantity.value,
        currency: product.value.price.currency,
      },
      ...selectedAddons.value.map((addon) => ({
        amount: addon.price.amount * addon.quantity,
        currency: addon.price.currency,
      })),
    ]);
    return total;
  }
  return {
    amount: 1,
    currency: Currency.TRY,
  };
});
</script>

<style scoped></style>
