<script setup lang="ts">
	const popupsStore = usePopupsStore();
	const foldersStore = useFoldersStore();

	const folderName = ref<string | null>();
	const isLoading = ref<boolean>(false);

	const createFolder = async () =>
	{
		isLoading.value = true;
		await foldersStore.createFolder(folderName.value);
		isLoading.value = false;
	};
</script>

<template>
	<div class="create-folder base-popup">
		<p class="g-title">Создать папку</p>
		<UiInput
			label="Название папки"
			placeholder="Работа"
			v-model="folderName"
		/>
		<div class="buttons">
			<UiButton
				color="white"
				:disabled="isLoading"
				@click="popupsStore.closeAnyPopup"
			>
				Отмена
			</UiButton>
			<UiButton
				@click="createFolder"
				:disabled="isLoading"
			>
				Подтвердить
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.create-folder
	{
		min-width: 400px;
		padding: 16px;

		display: flex;
		row-gap: 16px;
		flex-direction: column;
	}

	.buttons
	{
		column-gap: 12px;
		display: flex;
		justify-content: space-between;

		button { flex: 1; }
	}
</style>