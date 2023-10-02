<template>
  <h1>{{ welcomeMessage }}</h1>
</template>

<script setup>
const name = await new Promise((resolve) =>
  setTimeout(() => resolve("Simon"), 150)
);

const { t } = useI18n();
const welcomeMessage = computed(() => t("pages.promise.hello", { name }));
</script>
