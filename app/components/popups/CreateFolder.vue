<script setup lang="ts">
	import { minLength, required } from '@regle/rules';

	const popupsStore  = usePopupsStore();
	const foldersStore = useFoldersStore();

	const folderName = ref<string>('');
	const isLoading  = ref<boolean>(false);

	const { r$ } = useRegle(folderName,
		{
			required: withMessage(required, 'Поле обяательно'),
			minLength: withMessage(minLength(3), 'Название должно содержать минимум 3 символа')
		}
	);

	const createFolder = async () =>
	{
		const { valid } = await r$.$validate();

		if (!valid)
			return;

		isLoading.value = true;

		const response = await foldersStore.createFolder(folderName.value.trim());

		if (response?.success)
			popupsStore.closeAnyPopup();

		isLoading.value = false;
	};
</script>

<template>
	<div class="create-folder base-popup">
		<UiTitle :medium="true">
			Создать папку
		</UiTitle>
		<UiInput
			label="Название папки"
			placeholder="Работа"
			v-model="folderName"
			:error="r$.$errors[0]"
			@submit="createFolder"
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