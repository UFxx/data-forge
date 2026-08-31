<script setup>
	const popupsStore = usePopupsStore();

	const confirmDelete = () =>
	{
		popupsStore.popupData.deleteFunction(popupsStore.popupData?.id);
		popupsStore.closeAnyPopup();
	};
</script>

<template>
	<div class="delete base-popup">
		 <UiTitle :medium="true">
			Вы действительно хотите удалить элемент?
		 </UiTitle>
		<p v-if="popupsStore.popupData?.name">
			Имя элемента: <span class="element-name">"{{ popupsStore.popupData?.name }}"</span>
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
	.element-name { font-weight: 500; }
</style>