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
          selectedProduct.product?.user.publicName
        }}</span>
      </UButton>

      <div class="flex items-center gap-x-4 text-sm">
        <UAvatar
          :src="selectedProduct.product?.banner.link"
          :alt="selectedProduct.product?.title"
          size="lg"
          class="block rounded-full"
        />

        <div class="">
          <h2 class="font-semibold">{{ selectedProduct.product?.title }}</h2>
          <h2 class="italic">x{{ selectedProduct.quantity }}</h2>
        </div>
        <h2 class="ml-auto text-gray-400">
          Price -
          <span class="text-primary font-semibold">{{
            gpNumbers.formatCurrency(
              (selectedProduct.product?.price.amount ?? 1) *
                selectedProduct.quantity,

              selectedProduct.product?.price.currency,
            )
          }}</span>
        </h2>
      </div>
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
import type { FormSubmitEvent } from "#ui/types";
import { Form as VeeForm } from "vee-validate";
import { useVendorStore } from "~/store/vendor.store";
const emits = defineEmits(["close", "completed"]);

const OrderForm = ref<any>();
const errors = ref<{ location: any }>({ location: undefined });
const { selectedProduct } = storeToRefs(useVendorStore());
const useCurrentLocation = ref(false);

const schema = object({
  apartmentName: string().required("Apartment name is required"),
  doorNumber: number()
    .typeError("Enter a valid number")
    .required("Door number is required"),
  location: string().required("Location is required"),
  notes: string().optional(),
});

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
      getLocation();
    }
  },
  { deep: true, immediate: true },
);

async function checkOutOrder(field: any) {
  try {
    if (state.apartmentName && state.doorNumber && state.location) {
      const whatsappLink = generateWhatsappDirectLink({
        vendorName: selectedProduct.value.product?.user.publicName ?? "Vendor",
        productTitle: selectedProduct.value.product?.title ?? "Product",
        whatsAppNumber: "+2347062215229",
        productQuantity: selectedProduct.value.quantity,
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

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
const handleSuccess = (position: any) => {
  const { latitude, longitude } = position.coords;

  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  state.location = googleMapsLink;
};

const handleError = (error: any) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errors.value.location = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errors.value.location = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errors.value.location = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errors.value.location = "An unknown error occurred.";
      break;
  }
};
</script>

<style scoped></style>
