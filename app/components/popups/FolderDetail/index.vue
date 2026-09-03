<script setup lang="ts">
	import { type FolderDetailData } from '~/types/popups';
	import { type FileItem } from '~/types/files';

	const popupsStore  = usePopupsStore();
	const foldersStore = useFoldersStore();

	const files     = ref<FileItem[] | null>(null);
	const isLoading = ref(false);

	const popupData = popupsStore.popupData as FolderDetailData;

	const fetchFiles = async () =>
	{
		isLoading.value = true;

		const response = await foldersStore.fetchFolderFiles(popupData.id);

		if (response?.success)
			files.value = response.data;

		isLoading.value = false;
	};

	fetchFiles();
</script>

<template>
	<div class="folder-detail base-popup">
		<div class="header">
			<div class="icon-wr">
				<IconsFolder />
			</div>
			<div class="name">
				<UiTitle :medium="true">{{ popupData.folderName }}</UiTitle>
				<p class="files-count">{{ pluralize(popupData.filesCount, ['файл', 'файла', 'файлов']) }}</p>
			</div>
		</div>
		<div
			v-if="!isLoading"
			class="content"
		>
			<template v-if="files?.length">
				<PopupsFolderDetailFile
					v-for="file in files"
					:key="file.id"
					:id="file.id"
					:name="file.name"
					:size="file.size"
					:isProcessed="file.isProcessed"
				/>
			</template>
			<div v-else>Тут пока ничего нет</div>
		</div>

		<div v-else>Загрузка...</div>
	</div>
</template>

<style scoped lang='scss'>
	.header
	{
		display: flex;
		column-gap: 12px;
		align-items: center;
	}

	.name
	{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.files-count
	{
		font-size: 12px;
		line-height: 16px;
	}

	.icon-wr
	{
		width: 52px;
		height: 52px;
		border-radius: 8px;
		background-color: #F9F9FB;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content
	{
		border: 1px solid $lighter-gray;
		padding: 8px;
		border-radius: 8px;
		scrollbar-width: thin;

		display: flex;
		row-gap: 8px;
		flex-direction: column;
	}
</style>