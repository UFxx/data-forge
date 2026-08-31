<script setup lang="ts">
	const filesStore = useFilesStore();
</script>

<template>
	<div class="files">
		<div class="header">
			<p>Все файлы</p>
		</div>
		<TransitionGroup name="fade">
			<PagesMainFile
				v-for="file in filesStore.files"
				:key="file.id"
				:id="file.id"
				:name="file.name"
				:size="file.size"
				:folderId="file.folderId"
				:isProcessed="file.isProcessed"
			/>
		</TransitionGroup>
	</div>
</template>

<style scoped lang='scss'>
	.files
	{
		border: 1px solid $lighter-gray;
		border-radius: 12px;
	}

	.header
	{
		padding: 16px 12px;
		font-weight: 600;
		padding-bottom: 12px;
		border-bottom: 1px solid $lighter-gray
	}
</style>