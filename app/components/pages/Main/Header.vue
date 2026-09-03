<script setup lang="ts">
	const filesStore = useFilesStore();

	const isLoading = ref(false);

	const uploadHandler = async (e: Event) =>
	{
		const input = e.target as HTMLInputElement;

		if (!input.files?.length) return;

		const file = input.files[0];

		if (!file) return;

		isLoading.value = true;

		const response = await filesStore.uploadFile(file);

		isLoading.value = false;

		if (response?.success)
			navigateTo(`/processing/${response.data.fileId}`);;
	};

	const searchInputRef = ref<HTMLInputElement | null>(null);

	const model = defineModel();

	onKeyStroke(['Ctrl', '/'], () => searchInputRef.value?.focus());
</script>

<template>
	<div class="header">
		<div class="input-wr">
			<IconsSearch class="search-icon" />
			<input
				class="input"
				type="text"
				ref="searchInputRef"
				v-model="model"
				placeholder="Поиск файлов"
			>
		</div>
		<!-- <UiButton color="white">
			<IconsFilter />
			Фильтр
		</UiButton> -->
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

	<UiLoader v-if="isLoading" />
</template>

<style scoped lang='scss'>
	.header
	{
		border: 1px solid $lighter-gray;
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
		border: 1px solid $lighter-gray;
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