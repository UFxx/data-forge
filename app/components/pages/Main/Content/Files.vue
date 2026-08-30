<script setup lang="ts">
	const filesStore = useFilesStore();
</script>

<template>
	<div class="files">
		<div class="header">
			<p>Все файлы</p>
		</div>
		<PagesMainContentFile
			v-for="file in filesStore.files"
			:key="file.id"
			:id="file.id"
			:name="file.name"
			:size="file.size"
			:isProcessed="file.isProcessed"
		/>
	</div>
</template>

<style scoped lang='scss'>
	.files
	{
		border: 1px solid #E4E4E7;
		border-radius: 12px;
	}

	.header
	{
		padding: 16px 12px;
		font-weight: 600;
		padding-bottom: 12px;
		border-bottom: 1px solid #E4E4E7
	}
</style>