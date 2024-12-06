<template>
  <UCard
    class=""
    :ui="{
      base: 'h-full items-center px-6',
    }"
  >
    <template #header>
      <div class="mb-10 flex items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>
    <UChip
      size="xl"
      position="bottom-right"
      inset
      :ui="{ base: '-mx-2 rounded-none ring-0', background: '' }"
    >
      <UAvatar :src="user?.photo.link" alt="Avatar" size="3xl" />

      <template #content>
        <UButton
          icon="i-icon-camera"
          color="black"
          @click="emit('updateUserProfile')"
          :ui="{ rounded: 'rounded-full' }"
        />
      </template>
    </UChip>

    <div class="mb-5 mt-10 flex items-center justify-between gap-1">
      <h2 class="text-lg font-medium">Personal Details</h2>
      <UIcon
        name="i-icon-edit"
        class="h-6 w-6"
        @click="emit('updateUserProfile')"
      />
    </div>
    <div class="grid gap-6">
      <div
        class="flex items-center justify-between gap-1"
        v-for="user in profile"
      >
        <div class="flex items-center justify-start gap-1 text-sm">
          <UIcon :name="user.icon" size="2xl" />
          <h2 class="ml-1 font-medium">{{ user.label }}</h2>
        </div>
        <div class="flex items-center justify-end gap-1 text-sm text-gray-500">
          <h2 class="">{{ user.value }}</h2>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const { user } = storeToRefs(useAuthStore());
const profile = computed(() => [
  { label: "Firstname", icon: "i-icon-profile", value: user.value?.name.first },
  { label: "Lastname", icon: "i-icon-profile", value: user.value?.name.last },
  {
    label: "Phone Info",
    icon: "i-icon-phone",
    value: `${user.value?.phone.code}${user.value?.phone.number}`,
  },
  {
    label: "Email Info",
    icon: "i-icon-email",
    value: user.value?.email,
  },
]);

const emit = defineEmits(["updateUserProfile", "close"]);
</script>

<style scoped></style>
