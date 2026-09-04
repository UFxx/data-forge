<script setup lang="ts">
	import operations from '#config/operations.json';

	const { preprocessing: preprocessingApi } = useApi();

	const props = defineProps<{ filePath: string }>();

	const emit = defineEmits(['toggleMenu']);

	const choosedOperationCodes = ref<string[]>([]);

	const toggleOperation = (code: string) => {
		const index = choosedOperationCodes.value.indexOf(code);

		if (index === -1)
			choosedOperationCodes.value.push(code);
		else
			choosedOperationCodes.value.splice(index, 1);
	};

	const apply = async () => await preprocessingApi.preprocessing(props.filePath, choosedOperationCodes.value.join(' '));;
</script>

<template>
	<div class="menu">
		<div class="title">
			 <UiTitle :medium="true">Предобработка</UiTitle>
			<UiButton
				class="icon-wr"
				@click="emit('toggleMenu')"
			>
				<IconsPlus class="close-icon" />
			</UiButton>
		</div>
		<PagesProcessingMenuContent
			class="content"
			:operations
			:choosedOperationCodes
			@toggleOperation="toggleOperation"
		/>
		<div class="buttons">
			<UiButton
				color="white"
				@click="apply"
			>
				Применить
			</UiButton>
			<UiButton>
				Подтвердить
			</UiButton>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.menu
	{
		width: 400px;
		height: 100vh;
		border-left: 2px solid $lighter-gray;
		background-color: $white;

		top: 0;
		right: 0;
		display: flex;
		position: fixed;
		flex-direction: column;
	}

	.title
	{
		padding: 16px;
		border-bottom: 1px solid $lighter-gray;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.icon-wr
	{
		&:hover .close-icon
		{
			color: $red;
			opacity: 1;
		}
	}

	.close-icon
	{
		width: 18px;
		height: 18px;
		opacity: 0.5;
		transform: rotate(45deg);

		@include tr(0.3, opacity, color);
	}

	.content { flex: 1; }

	.buttons
	{
		padding: 16px;
		border-top: 1px solid $lighter-gray;

		display: flex;
		column-gap: 12px;

		button { flex: 1; }
	}
</style>