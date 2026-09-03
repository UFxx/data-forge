<script setup lang="ts">
	const filesStore   = useFilesStore();
	const foldersStore = useFoldersStore();

	const searchString = ref<string>('');

	await filesStore.fetchFiles(true);
	await foldersStore.fetchFolders(true);
</script>

<template>
	<div class="index-page">
		<PagesMainProfile />

		<div class="content">
			<PagesMainHeader v-model="searchString" />
			<PagesMainFolders />
			<PagesMainFiles :searchString />
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