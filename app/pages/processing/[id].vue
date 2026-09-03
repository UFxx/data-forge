<script setup lang="ts">
	const filesStore  = useFilesStore();
	const fileId      = useRoute().params.id as string;

	if (!filesStore.fileForProcessing || filesStore.fileForProcessing.id !== fileId)
		await filesStore.fetchFile(fileId);

	useSeoMeta({ title: filesStore.fileForProcessing?.name });

	const { fileData, fileHeaders } = useFormatCsv(filesStore.fileForProcessing?.text);

	const isMenuOpened = ref(true);

	const toggleMenu = () => isMenuOpened.value = !isMenuOpened.value;
</script>

<template>
	<div class="processing">
		<div
			class="table-wr"
			:class="{ 'menu-opened': isMenuOpened }"
		>
			<div class="title">{{ filesStore.fileForProcessing?.name }}</div>
			<table class="table">
				<PagesProcessingTableHeader :headers="fileHeaders" />
				<PagesProcessingTableContent :content="fileData" />
			</table>
		</div>

		<div
			class="icon-wr"
			@click="toggleMenu"
		>
			<IconsBurger />
		</div>

		<Teleport to="body">
			<Transition name="slide-right">
				<PagesProcessingMenu
				v-if="isMenuOpened"
				:filePath="filesStore.fileForProcessing?.path || ''"
				@toggleMenu="toggleMenu"
				/>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped lang='scss'>
	.processing
	{
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
	}

	.table-wr
	{
		width: 100%;
		overflow: auto;
		max-width: 1366px;
		max-height: calc(100vh - 40px);
		scrollbar-width: thin;

		@include tr(0.3, padding, transform);

		&.menu-opened { transform: translateX(-200px); }
	}

	.title
	{
		border: 1px solid $black;
		padding: 10px 0;
		font-size: 18px;
		text-align: center;
		font-weight: 600;
		border-bottom: none;
		border-radius: 8px 8px 0 0;

		left: 0;
		position: sticky;
	}

	.table { width: 100%; }

	.icon-wr
	{
		width: 44px;
		height: 44px;
		cursor: pointer;
		border-radius: 8px;

		top: 0;
		right: -80px;
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;

		@include tr(0.3, box-shadow);

		&:hover { box-shadow: inset 0 0 1px 1px $lighter-gray; }
	}
</style>