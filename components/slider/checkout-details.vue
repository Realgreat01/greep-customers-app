<template>
  <UCard
    class="hide-scrollbar h-full overflow-y-scroll"
    :ui="{ divide: 'divide-white' }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Order Details
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="closeSlider"
        />
      </div>
    </template>
    <UCard>
      <UButton
        class="gray-gradient-background ml-auto flex h-6 w-max self-end justify-self-end"
        variant="ghost"
        :ui="{ rounded: 'rounded-full' }"
      >
        by
        <span class="font-semibold">{{
          selectedVendorCart?.vendor.publicName
        }}</span>
      </UButton>
      <template v-for="product in selectedVendorCart?.products">
        <div class="my-2 flex items-center gap-x-4 text-sm">
          <UAvatar
            size="sm"
            class="block rounded-full"
            :src="product.product.banner.link"
            :alt="product.product.title"
          />

          <div class="">
            <h2 class="font-semibold">{{ product.product.title }}</h2>
            <h2 class="italic">x {{ product.quantity }}</h2>
          </div>
          <h2 class="ml-auto text-gray-400">
            Price -
            <span class="text-primary font-semibold">{{
              gpNumbers.formatCurrency(
                (product.product?.price.amount ?? 1) * product.quantity,

                product.product?.price.currency,
              )
            }}</span>
          </h2>
        </div>
        <UDivider />
      </template>
    </UCard>

    <UCard class="mt-4">
      <h2 class="mb-3 text-center text-xl font-semibold">
        Tell Us Where to Deliver <br />
        Your Order
      </h2>
      <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }">
        <UForm
          :schema="schema"
          ref="OrderForm"
          :state="state"
          class="space-y-4"
          @submit.prevent="handleSubmit($event, checkOutOrder)"
        >
          <UFormGroup label="Apartment Name" name="apartmentName" required>
            <UInput v-model="state.apartmentName" />
          </UFormGroup>
          <UFormGroup label="Door Number" name="doorNumber" required>
            <UInput v-model.number="state.doorNumber" type="number" />
          </UFormGroup>

          <UFormGroup
            label="Location"
            name="location"
            required
            eager-validation
          >
            <UButton
              v-if="useCurrentLocation"
              :class="state.location && 'bg-green-100'"
              variant="outline"
              block
              class="h-12 ring-gray-300"
              icon="i-icon-location-drop"
            >
            </UButton>
            <BaseLocationPicker v-else v-model="state.location" />

            <UCheckbox
              v-model="useCurrentLocation"
              name="location"
              size="lg"
              label="Use current location"
            />
          </UFormGroup>

          <UFormGroup
            label="Landmark or delivery notes"
            name="notes"
            hint="Optional"
          >
            <UTextarea v-model="state.notes" />
          </UFormGroup>

          <UButton
            class="green-gradient-background h-12"
            type="submit"
            block
            :loading="isSubmitting"
            :disabled="Object.keys(errors).length !== 0 || isSubmitting"
          >
            Submit Delivery Details
          </UButton>
        </UForm>
      </VeeForm>
    </UCard>
  </UCard>
</template>

<script setup lang="ts">
import { number, object, string, type InferType } from "yup";
import { useGeolocation } from "@vueuse/core";
import { Form as VeeForm } from "vee-validate";
import { useVendorStore } from "~/store/vendor.store";
const emits = defineEmits(["close", "completed"]);

const OrderForm = ref<any>();
const errors = ref<{ location: any }>({ location: undefined });
const { selectedVendorCart } = storeToRefs(useVendorStore());
const useCurrentLocation = ref(false);

const schema = object({
  apartmentName: string().required("Apartment name is required"),
  doorNumber: number()
    .typeError("Enter a valid number")
    .required("Door number is required"),
  location: string().required("Location is required"),
  notes: string().optional(),
});

const { resume, coords } = useGeolocation();

type Schema = InferType<typeof schema>;

const state = reactive<any>({
  apartmentName: undefined,
  doorNumber: undefined,
  location: undefined,
  notes: undefined,
});

const closeSlider = () => {
  emits("close");
};

watch(
  useCurrentLocation,
  (value) => {
    if (value === true) {
      resume();
    }
  },
  { deep: true, immediate: true },
);

async function checkOutOrder(field: any) {
  try {
    if (state.apartmentName && state.doorNumber && state.location) {
      const whatsappLink = generateWhatsappDirectLink({
        vendorName: "Vendor",
        productTitle: "Product",
        whatsAppNumber: "+2347062215229",
        productQuantity: 2,
        apartmentName: state.apartmentName,
        doorNumber: state.doorNumber,
        location: state.location,
        notes: state.notes,
      });

      window.open(whatsappLink, "_blank");
      emits("completed");
    }
  } catch (validationError) {
    // Handle validation error
    console.error("Validation failed", validationError);
  }
}

const handleSuccess = (position: any) => {
  const { latitude, longitude } = position.coords;

  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  state.location = googleMapsLink;
};
</script>

<style scoped></style>
