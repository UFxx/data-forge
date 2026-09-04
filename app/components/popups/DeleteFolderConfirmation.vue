<script setup lang="ts">
	import type { DeleteFolderConfirmationData } from '../../types/popups';

	const popupsStore = usePopupsStore();
	const filesStore  = useFilesStore();

	const popupData = popupsStore.popupData as DeleteFolderConfirmationData;

	const isLoading = ref(false);

	const confirmDelete = async (unlinkFiles? :boolean, withFiles?: boolean) =>
	{
		isLoading.value = true;

		const response = await popupData.deleteFunction(popupData?.id, withFiles, unlinkFiles);

		if (response && response.success)
		{
			popupsStore.closeAnyPopup();
			await filesStore.fetchFiles();
		}

		isLoading.value = false;
	};
</script>

<template>
	<div class="delete-folder base-popup">
		<UiTitle :medium="true">
			В этой папке есть файлы<br>
			Удалить их?
		</UiTitle>
		<div class="buttons">
			<UiButton
				color="white"
				@click="popupsStore.closeAnyPopup"
				:disabled="isLoading"
			>
				Отменить
			</UiButton>
			<UiButton
				@click="confirmDelete(true, false)"
				:disabled="isLoading"
			>
				Открепить файлы и удалить
			</UiButton>
			<UiButton
				color="red"
				@click="confirmDelete(false, true)"
				:disabled="isLoading"
			>
				Удалить с файлами
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'></style>