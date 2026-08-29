<script setup lang="ts">
	const filesStore = useFilesStore();
</script>

<template>
	<pre>{{ filesStore.fileForProcessing }}</pre>
</template>

<style scoped lang='scss'></style>