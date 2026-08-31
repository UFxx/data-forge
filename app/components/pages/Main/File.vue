<script setup lang="ts">
	const popupsStore = usePopupsStore();
	const filesStore  = useFilesStore();

	const props = defineProps<{
		id          : string,
		size        : number,
		name        : string,
		folderId?   : string | null,
		isProcessed : boolean
	}>();

	const openDeleteConfirmationPopup = () =>
	{
		popupsStore.setPopupData(
			{
				id             : props.id,
				name           : props.name,
				deleteFunction : filesStore.deleteFile
			}
		);
		popupsStore.togglePopup('deleteConfirmation', true);
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

	const openChooseFolderPopup = () =>
	{
		popupsStore.setPopupData(
			{
				fileId          : props.id,
				currentFolderId : props.folderId
			}
		);
		popupsStore.togglePopup('chooseFolder', true);
	};
</script>

<template>
	<div class="file">
		<NuxtLink
			class="name"
			:to="id"
		>
		<div class="icon-wr">
			<IconsCSV />
		</div>
		<p>{{ name }}</p>
	</NuxtLink>
		<div class="meta">
			<p>{{ formatFileSize(size) }}</p>
			<ItemOptions
				:moveToFolder="true"
				@rename="openRenamePopup"
				@delete="openDeleteConfirmationPopup"
				@moveToFolder="openChooseFolderPopup"
			/>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.file
	{
		padding: 14px 16px;
		border-bottom: 1px solid $lighter-gray;

		display: flex;
		justify-content: space-between;

		position: relative;

		@include tr(0.3, background-color);

		&:hover { background-color: darken($white, 1); }

		&:last-child { border-bottom: none; }
	}

	.name
	{
		font-weight: 500;

		display: flex;
		column-gap: 12px;
		align-items: center;

		&:hover p { transform: translateX(4px); }

		p { @include tr(0.3, transform); }
	}

	.icon-wr
	{
		padding: 9px;
		border-radius: 8px;
		background-color: #F9F9FB;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.meta
	{
		font-size: 12px;
		line-height: 16px;

		display: flex;
		column-gap: 12px;
		align-items: center;
	}
</style>