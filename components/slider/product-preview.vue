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

      <div class="grid flex-1 p-3">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">{{ product?.title }}</h2>
          <UIcon name="i-icon-favorite" class="h-5 w-5" />
        </div>

        <div class="flex items-center justify-between">
          <h2 class="text-gray">
            Starts from
            <span class="text-lg font-semibold">{{
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

        <div class="my-4" v-if="product.data.type === 'foods'">
          <h2
            class="text-base font-semibold"
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
            <h2 class="text-sm font-semibold first-letter:capitalize">
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
            <div class="grid gap-4">
              <div
                class="ml-10 flex items-center justify-between text-sm"
                v-for="[item, property] in Object.entries(addOnProperty.items)"
              >
                <h2 class="first-letter:capitalize">{{ item }}</h2>
                <div class="flex gap-x-1">
                  <h2 class="">
                    +
                    {{
                      gpNumbers.formatCurrency(
                        property.price.amount,
                        property.price.currency,
                      )
                    }}
                  </h2>

                  <UCheckbox color="green" :ui="{ rounded: 'rounded-full' }" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <UButton
          label="Add To Cart"
          block
          color="green"
          class="justify-self-end"
          icon="i-icon-shopping-cart"
          :disabled="cart.some((cart) => cart.productId === product?.id)"
          @click="addToCart"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";

const toast = useToast();
const { selectedProduct: product, cart } = storeToRefs(useProductStore());
const productStore = useProductStore();

const emit = defineEmits(["openFullCartsModal", "close"]);
const quantity = ref(1);
const addToCart = () => {
  if (product.value) {
    toast.add({ title: "Item added to cart succesfully!", color: "green" });
    productStore.addToCart(product.value, quantity.value);
  }
};
</script>

<style scoped></style>
