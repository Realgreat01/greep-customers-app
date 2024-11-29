<template>
  <GoogleAutocomplete
    v-model:model-value="initialValue"
    :value="initialValue?.name ?? initialValue?.location"
    v-bind="$attrs"
    placeholder="Select location"
    class="google-location z-[100000] focus:ring-brand-500"
    :api-key="GoogleMapApiKey"
    @set="getPayload"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleAutocomplete } from "vue3-google-autocomplete";

const GoogleMapApiKey = ENV.GOOGLE_MAP_API_KEY;
const props = defineProps(["value"]);
const initialValue = ref(props.value);
const modelValue = defineModel();

const getPayload = (e: any) => {
  modelValue.value = `https://www.google.com/maps?q=${e.latitude},${e.longitude}`;
  initialValue.value = e;
};
</script>
