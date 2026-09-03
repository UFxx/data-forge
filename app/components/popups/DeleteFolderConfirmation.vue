<script setup lang="ts">
	import type { DeleteFolderConfirmationData } from '../../types/popups';

	const popupsStore = usePopupsStore();
	const filesStore  = useFilesStore();

	const popupData = popupsStore.popupData as DeleteFolderConfirmationData;

	const confirmDelete = async (unlinkFiles? :boolean, withFiles?: boolean) =>
	{
		const response = await popupData.deleteFunction(popupData?.id, withFiles, unlinkFiles);

		if (response && response.success)
		{
			popupsStore.closeAnyPopup();
			await filesStore.fetchFiles();
		}
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
			>
				Отменить
			</UiButton>
			<UiButton
				@click="confirmDelete(true, false)"
			>
				Открепить файлы и удалить
			</UiButton>
			<UiButton
				color="red"
				@click="confirmDelete(false, true)"
			>
				Удалить с файлами
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'></style>