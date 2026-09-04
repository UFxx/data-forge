<script setup lang="ts">
	import operations from '#config/operations.json';

	const filesStore = useFilesStore();

	const props = defineProps<{
		filePath : string,
		fileId   : string
	}>();

	const emit = defineEmits(['toggleMenu', 'toggleIsProcessing', 'setProcessingMessage']);

	const choosedOperationCodes = ref<string[]>([]);

	const toggleOperation = (code: string) => {
		const index = choosedOperationCodes.value.indexOf(code);

		if (index === -1)
			choosedOperationCodes.value.push(code);
		else
			choosedOperationCodes.value.splice(index, 1);
	};

	let timer: NodeJS.Timeout;

	const apply = async () =>
	{
		emit('toggleIsProcessing', true);

		const response = await filesStore.startPreprocessing(props.filePath, choosedOperationCodes.value.join(' '));

		if (response.success)
		{
			emit('setProcessingMessage', response.message);
			timer = setInterval(() => checkProcessingStatus(), 1500);
		}
		else
			emit('toggleIsProcessing', false);
	};

	const checkProcessingStatus = async () =>
	{
		try
		{
			const response = await filesStore.checkProcessingStatus(props.filePath);

			emit('setProcessingMessage', response.message);

			if (response.success)
			{
				emit('toggleIsProcessing', false);
				clearInterval(timer);

				await filesStore.fetchFile(props.fileId);
				return;
			}
		}
		catch (err: any)
		{
			emit('toggleIsProcessing', false);
			clearInterval(timer);
		}
	};
</script>

<template>
	<div class="menu">
		<div class="title">
			<div class="text">
				<UiTitle :medium="true">Предобработка</UiTitle>
				<p class="label">Для оптимизации показаны только 500 строк</p>
			</div>
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
		z-index: 1;
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

	.text
	{
		color: $black;

		row-gap: 4px;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}

	.label
	{
		font-size: 12px;
		color: $light-gray;
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