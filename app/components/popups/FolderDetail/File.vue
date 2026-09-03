<script setup lang="ts">
	const popupsStore  = usePopupsStore();
	const filesStore   = useFilesStore();
	const foldersStore = useFoldersStore();

	const props = defineProps<{
		id          : string,
		name        : string,
		size        : number,
		isProcessed : boolean
	}>();

	const fileLink = computed(() => `${props.isProcessed ? '/file' : '/processing'}/${props.id}`)

	const unlinkFileFromFolder = async () =>
	{
		const response = await filesStore.moveFile(props.id, 'empty');

		if (response?.success)
		{
			await foldersStore.fetchFolders();
			await filesStore.fetchFiles();
			popupsStore.closeAnyPopup();
		}
	};

	const openRenamePopup = () =>
	{
		popupsStore.setPopupData(
			{
				id             : props.id,
				name           : props.name,
				isFile         : true,
				renameFunction : filesStore.renameFile
			}
		);
		popupsStore.togglePopup('rename', true);
	};

	const openDeleteConfirmationPopup = () =>
	{
		popupsStore.setPopupData(
			{
				id             : props.id,
				name           : props.name,
				deleteFunction : foldersStore.deleteFolder
			}
		);
		popupsStore.togglePopup('deleteConfirmation', true)
	};
</script>

<template>
	<div
		class="file"
		@click="popupsStore.closeAnyPopup"
	>
		<NuxtLink
			:to="fileLink"
			class="content"
		>
			<div class="icon-wr">
				<IconsCSV />
			</div>
			<div class="meta">
				<p class="name">{{ name }}</p>
				<p class="size">{{ formatFileSize(size) }}</p>
			</div>
		</NuxtLink>
		<ItemOptions
			:unlinkFileFromFolder="true"
			@rename="openRenamePopup"
			@delete="openDeleteConfirmationPopup"
			@unlinkFileFromFolder="unlinkFileFromFolder"
		/>
	</div>
</template>

<style scoped lang='scss'>
	.file
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content
	{
		cursor: pointer;
		border-radius: 8px;
		padding-right: 8px;

		display: flex;
		column-gap: 12px;
		align-items: center;

		@include tr(0.3, background-color);

		&:hover { background-color: rgba($black, 0.1); }
	}

	.icon-wr
	{
		width: 44px;
		height: 44px;
		border: 1px solid $lighter-gray;
		background-color: $white;
		border-radius: 8px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.meta
	{
		display: flex;
		row-gap: 4px;
		flex-direction: column;
	}

	.name { font-weight: 500; }
</style>