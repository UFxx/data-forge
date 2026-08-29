<script setup lang="ts">
	const filesStore = useFilesStore();


	const uploadHandler = async (e: Event) =>
	{
		const input = e.target as HTMLInputElement;

		if (!input.files?.length) return;

		const file = input.files[0];

		if (!file) return;

		const response = await filesStore.uploadFile(file);

		if (response)
			navigateTo('/processing');
	};

	const searchInputRef = ref<HTMLInputElement | null>(null);

	onKeyStroke(['Ctrl', '/'], () => searchInputRef.value?.focus());
</script>

<template>
	<div class="content">
		<div class="container">
			<div class="input-wr">
				<IconsSearch class="search-icon" />
				<input
					class="input"
					type="text"
					ref="searchInputRef"
					placeholder="Поиск файлов"
				>
			</div>
			<UiButton color="white">
				<IconsFilter />
				Фильтр
			</UiButton>
			<label class="upload-wr">
				<UiButton class="upload-button">
					<IconsUpload />
				</UiButton>
				<input
					class="upload-input"
					type="file"
					accept=".csv"
					@change="uploadHandler"
				>
			</label>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.content
	{
		display: flex;
		row-gap: 16px;
		flex-direction: column;
	}

	.container
	{
		border: 1px solid #E4E4E7;
		padding: 16px;
		border-radius: 8px;

		display: flex;
		column-gap: 12px;
	}

	.input-wr
	{
		width: 100%;

		position: relative;

		&::before
		{
			content: 'CTRL + /';
			font-size: 12px;
			transform: translateY(-50%);
			line-height: 16px;
			pointer-events: none;

			top: 50%;
			right: 24px;
			position: absolute;
		}
	}

	.search-icon
	{
		color: $gray;
		transform: translateY(-50%);

		top: 50%;
		left: 12px;
		position: absolute;
	}

	.input
	{
		width: 100%;
		padding: 12px 0 12px 36px;
		border: 1px solid #E4E4E7;
		border-radius: 8px;
	}

	.upload-wr
	{
		display: flex;
		position: relative;
	}

	.upload-button
	{
		padding-inline: 16px;
		height: 100%;
	}

	.upload-input
	{
		width: calc(100% + 8px);
		cursor: pointer;
		height: 100%;
		z-index: 1;
		opacity: 0;
		font-size: 0;

		top: 0;
		position: absolute;
	}
</style>