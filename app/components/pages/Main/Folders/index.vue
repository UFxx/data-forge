<script setup lang="ts">
	const popupsStore  = usePopupsStore();
	const foldersStore = useFoldersStore();
</script>

<template>
	<div class="folders">
		<div class="header">
			<div class="title">
				<div class="icon-wr">
					<IconsFolder />
				</div>
				<p>Папки</p>
			</div>
			<UiButton
				class="add-folder"
				color="white"
				@click="popupsStore.togglePopup('createFolder', true)"
			>
				<IconsPlus />
				Создать папку
			</UiButton>
		</div>
		<div class="folders-list">
			<PagesMainFoldersFolder
				v-for="folder in foldersStore.folders"
				:key="folder.id"
				:id="folder.id"
				:name="folder.name"
				:filesCount="folder.filesCount"
			/>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.folders
	{
		border: 1px solid $lighter-gray;
		padding: 20px 28px 20px 20px;
		border-radius: 12px;
		background-color: #F9F9FB;

		row-gap: 20px;
		display: flex;
		flex-direction: column;
	}

	.header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title
	{
		font-weight: 600;

		display: flex;
		column-gap: 12px;
		align-items: center;
	}

	.icon-wr
	{
		width: 40px;
		height: 40px;
		border-radius: 8px;
		border: 1px solid $lighter-gray;
		background-color: $white;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-folder { font-weight: 500; }

	.folders-list
	{
		overflow-x: auto;
		scrollbar-width: none;

		display: flex;
		column-gap: 12px;
	}
</style>