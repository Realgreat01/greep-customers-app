<template>
  <h2 class="flex items-center gap-x-1">
    {{ name }} <UIcon name="i-icon-verified-badge" />
  </h2>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
  },
});
</script>

<style scoped></style>
