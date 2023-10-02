<template>
  <h1>{{ $t("pages.test.title") }}</h1>
  <p>{{ $t("pages.test.content") }}</p>
  <v-btn @click="handleGreeting">Hello</v-btn>
</template>

<script setup lang="ts">
const handleGreeting = () => alert("Hello from vuetify");
</script>
