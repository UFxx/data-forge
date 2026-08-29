<script setup lang="ts">
	const filesStore = useFilesStore();

	await filesStore.fetchFiles();
</script>

<template>
	<div class="index-page">
		<PagesMainProfile />
		<PagesMainContent />
	</div>
</template>

<style scoped lang='scss'>
	.index-page
	{
		display: grid;
		column-gap: 40px;
		grid-template-columns: 1fr 1000px;
	}
</style>