<script setup lang="ts">
	const popupsStore  = usePopupsStore();
	const foldersStore = useFoldersStore();

	const props = defineProps<{
		id         : string,
		name       : string,
		filesCount : number
	}>();

	const openDeleteConfirmationPopup = () =>
	{
		popupsStore.setPopupData(
			{
				id   : props.id,
				name : props.name,
				deleteFunction: foldersStore.deleteFolder
			}
		);
		popupsStore.togglePopup('deleteConfirmation', true)
	};

	const openRenamePopup = () =>
	{
		popupsStore.setPopupData(
			{
				id             : props.id,
				name           : props.name,
				renameFunction : foldersStore.renameFolder
			}
		);
		popupsStore.togglePopup('rename', true);
	}
</script>

<template>
	<div class="folder">
		<div class="header">
			<div class="folder-icon-wr">
				<IconsFolder />
			</div>
			<ItemOptions
				@rename="openRenamePopup"
				@delete="openDeleteConfirmationPopup"
			/>
		</div>
		<div class="meta">
			<p class="title">{{ name }}</p>
			<p class="files-count">{{ pluralize(filesCount, ['файл', 'файла', 'файлов']) }}</p>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.folder
	{
		width: 230px;
		border: 1px solid $lighter-gray;
		cursor: pointer;
		padding: 16px;
		border-radius: 12px;
		background-color: $white;

		display: flex;
		flex-shrink: 0;
		row-gap: 20px;
		flex-direction: column;

		@include tr(0.3, background-color);

		&:hover { background-color: rgba($black, 0.01); }
	}

	.folder-icon-wr
	{
		color: $black;
		width: 44px;
		height: 44px;
		background-color: #F9F9FB;
		border-radius: 8px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-wr
	{
		width: 44px;
		height: 44px;
		cursor: pointer;
		color: $light-gray;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover svg { color: $black; }

		svg { @include tr(0.3, color); }
	}

	.header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.meta
	{
		width: max-content;

		row-gap: 4px;
		display: flex;
		flex-direction: column;
	}

	.title { font-weight: 500; }

	.files-count
	{
		font-size: 12px;
		line-height: 16px;
	}
</style>