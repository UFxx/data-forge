<script setup lang="ts">
	const popupsStore  = usePopupsStore();
	const filesStore   = useFilesStore();
	const foldersStore = useFoldersStore();

	const currentFolderId = ref<string | null>(null);
	const isLoading       = ref(false);

	const chooseFolder = (id: string) => currentFolderId.value = id;

	const moveFile = async () =>
	{
		isLoading.value = true;

		try
		{
			if (!currentFolderId.value)
				return;

			const response = await filesStore.moveFile(popupsStore.popupData.fileId, currentFolderId.value);

			if (response?.success)
			{
				await foldersStore.fetchFolders();
				await filesStore.fetchFiles();
				popupsStore.closeAnyPopup();
			}
		}
		catch (err: any) { console.error(err); }
		finally { isLoading.value = false; }
	}
</script>

<template>
	<div class="choose-folder base-popup">
		<p class="g-title">Выберите папку</p>

		<div class="folders">
			<PopupsChooseFolder
				v-for="folder in foldersStore.folders"
				:key="folder.id"
				:id="folder.id"
				:name="folder.name"
				:filesCount="folder.filesCount"
				:currentFolderId
				:disabled="popupsStore.popupData.currentFolderId === folder.id"
				@choose="chooseFolder"
			/>
		</div>

		<div class="buttons">
			<UiButton
				color="white"
				:disabled="isLoading"
				@click="popupsStore.closeAnyPopup"
			>
				Отменить
			</UiButton>
			<UiButton
				:disabled="isLoading || !currentFolderId"
				@click="moveFile"
			>
				Переместить
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.choose-folder
	{
		padding: 16px;
	}

	.folders
	{
		border: 1px solid $lighter-gray;
		padding: 8px;
		max-height: 300px;
		overflow-y: auto;
		border-radius: 12px;
		scrollbar-width: thin;

		display: flex;
		row-gap: 12px;
		flex-direction: column;
	}

	.buttons
	{
		display: flex;
		justify-content: flex-end;

		button { flex: 0; }
	}
</style>