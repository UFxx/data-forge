<script setup lang="ts">
	defineProps<{ medium?: boolean }>();
</script>

<template>
	<p
		class="g-title"
		:class="{ 'medium': medium  }"
	>
		<slot />
	</p>
</template>