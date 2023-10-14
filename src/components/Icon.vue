<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <svg :class="`icon icon-${props.src}`">
    <use :xlink:href="`#icon-${props.src}`"></use>
  </svg>
</template>

<style scoped></style>
