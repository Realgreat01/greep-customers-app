<template>
  <NuxtLayout>
    <UContainer>
      <NuxtPage />
    </UContainer>
    <UNotifications />
    <USlideovers />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Greep - Customers",
  ogTitle: "Greep - Customers",
  applicationName: "Greep",
  description:
    "Greep is your go-to platform for ordering affordable and authentic African food items, designed specifically for Africans living in the diaspora. We bring the taste of home right to your doorstep, with a mission to make your favorite African meals accessible, no matter where you are in the world",
  ogDescription:
    "Greep is your go-to platform for ordering affordable and authentic African food items, designed specifically for Africans living in the diaspora. We bring the taste of home right to your doorstep, with a mission to make your favorite African meals accessible, no matter where you are in the world",
  ogImage:
    "https://res.cloudinary.com/dindu/image/upload/v1715005640/Sign_up_umcf0p.svg",
  twitterCard: "summary_large_image",
  ogType: "website",
  ogLocale: "en_UK",
  twitterImage:
    "https://res.cloudinary.com/dindu/image/upload/v1715005640/Sign_up_umcf0p.svg",
  themeColor: "5b29d6",
});
</script>
