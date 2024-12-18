<script setup lang="ts">
const router = useRouter();
onBeforeMount(() => {
  router.replace("/");
});
</script>
