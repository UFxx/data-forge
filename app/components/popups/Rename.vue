<script setup lang="ts">
	import { minLength, required } from '@regle/rules';

	const popupsStore = usePopupsStore();

	const newName   = ref<string>(popupsStore.popupData.name);
	const isLoading = ref(false);

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

		if (popupsStore.popupData.isFile && !finalName.endsWith('.csv'))
			finalName = `${finalName}.csv`;

		isLoading.value = true;

		try
		{
			const response  = await popupsStore.popupData.renameFunction(popupsStore.popupData.id, finalName);
				if (response)
					popupsStore.closeAnyPopup();
		}
		catch (err: any) { console.error(err); }
		finally { isLoading.value = false; }

	}
</script>

<template>
	<div class="rename base-popup">
		<p class="g-title">Переименовать элемент</p>
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

<style scoped lang='scss'>
	.rename { padding: 16px; }
</style>