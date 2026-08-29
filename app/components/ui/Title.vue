<script setup lang="ts">
	defineProps<{ text: string }>();
</script>

<template>
	<p class="g-title">{{ text }}</p>
</template>