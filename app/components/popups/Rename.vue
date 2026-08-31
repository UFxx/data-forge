<script setup lang="ts">
	import { minLength, required } from '@regle/rules';
	import type { RenameData } from '~/types/popups';

	const popupsStore = usePopupsStore();
	const popupData   = popupsStore.popupData as RenameData;

	const newName   = ref<string>(popupData.name);
	const isLoading = ref<boolean>(false);

	const { r$ } = useRegle(newName,
		{
			required: withMessage(required, 'Поле обязательно'),
			minLength: withMessage(minLength(3), 'Минимум 3 символа')
		}
	)

	const confirmRename = async () =>
	{
		const { valid } = await r$.$validate();

		if (!valid)
			return;

		let finalName = newName.value.trim();

		if (popupData.isFile && !finalName.endsWith('.csv'))
			finalName = `${finalName}.csv`;

		isLoading.value = true;

		try
		{
			const response  = await popupData.renameFunction(popupData.id, finalName);
				if (response)
					popupsStore.closeAnyPopup();
		}
		catch (err: any) { console.error(err); }
		finally { isLoading.value = false; }

	}
</script>

<template>
	<div class="rename base-popup">
		<UiTitle :medium="true">
			Переименовать элемент
		</UiTitle>
		<UiInput
			label="Новое имя"
			placeholder="Пятый элемент"
			:error="r$.$errors[0]"
			v-model="newName"
			@submit="confirmRename"
		/>

		<div class="buttons">
			<UiButton
				color="white"
				:disabled="isLoading"
				@click="popupsStore.closeAnyPopup"
			>
				Отменить
			</UiButton>
			<UiButton
				:disabled="isLoading"
				@click="confirmRename"
			>
				Сохранить
			</UiButton>
		</div>
	</div>
</template>