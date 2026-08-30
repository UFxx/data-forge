<script setup>
	const popupsStore = usePopupsStore();
	const filesStore = useFilesStore()

	const confirmDelete = () =>
	{
		filesStore.deleteFile(popupsStore.popupData?.id);
		popupsStore.closeAnyPopup();
	};
</script>

<template>
	<div class="delete-file base-popup">
		<p class="g-title">Вы действительно хотите удалить файл?</p>
		<p v-if="popupsStore.popupData?.name">
			Имя файла: <span class="filename">{{ popupsStore.popupData?.name }}</span>
		</p>
		<div class="buttons">
			<UiButton
				color="white"
				@click="popupsStore.closeAnyPopup"
			>
				Отменить
			</UiButton>
			<UiButton
				color="red"
				@click="confirmDelete"
			>
				Подтвердить
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.delete-file
	{
		padding: 16px;

		display: flex;
		row-gap: 16px;
		flex-direction: column;
	}

	.filename { font-weight: 500; }

	.buttons
	{
		display: flex;
		column-gap: 12px;

		button { flex: 1; }
	}
</style>