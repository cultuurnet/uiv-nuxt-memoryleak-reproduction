<template>
  <div>{{ query.result }}</div>
</template>

<script setup lang="ts">
const query = useGetHomeQuery();
</script>
