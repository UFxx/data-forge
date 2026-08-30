<script setup lang="ts">
	const filesStore = useFilesStore();

	await filesStore.fetchFiles();
</script>

<template>
	<div class="index-page">
		<PagesMainProfile />

		<div class="content">
			<PagesMainHeader />
			<PagesMainFolders />
			<PagesMainFiles />
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.index-page
	{
		display: grid;
		column-gap: 40px;
		grid-template-columns: 1fr 1000px;
	}

	.content
	{
		display: flex;
		row-gap: 16px;
		flex-direction: column;
	}
</style>