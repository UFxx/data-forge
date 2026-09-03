<script setup lang="ts">
	import type { FileItem } from '~/types/files';
	const filesStore = useFilesStore();

	const props = defineProps<{ searchString: string }>();

	const displayedFiles = computed(() =>
		{
			const searchString = props.searchString;

			if (!searchString)
				return filesStore.files;

			return filesStore.files?.filter((file: FileItem) =>
				file.name.toLowerCase().startsWith(searchString.trim().toLowerCase()));
		}
	);
</script>

<template>
	<div class="files">
		<div class="header">
			<p>Все файлы</p>
		</div>
		<TransitionGroup name="fade">
			<PagesMainFilesItem
				v-for="file in displayedFiles"
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

		&:not(:has(.file)) .header { border-bottom: none; }
	}

	.header
	{
		padding: 16px 12px;
		font-weight: 600;
		padding-bottom: 12px;
		border-bottom: 1px solid $lighter-gray
	}
</style>