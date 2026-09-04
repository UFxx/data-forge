<script setup lang="ts">
	const filesStore = useFilesStore();
	const fileId     = useRoute().params.id as string;

	if (!filesStore.fileForProcessing || filesStore.fileForProcessing.id !== fileId)
		await filesStore.fetchFile(fileId);

	useSeoMeta({ title: filesStore.fileForProcessing?.name });

	const { fileData, fileHeaders } = useFormatCsv(filesStore);

	const isMenuOpened      = ref<boolean>(false);
	const isProcessing      = ref<boolean>(false);
	const processingMessage = ref<string>('');

	const toggleMenu           = () => isMenuOpened.value = !isMenuOpened.value;
	const toggleIsProcessing   = (value: boolean) => isProcessing.value = value;
	const setProcessingMessage = (value: string) => processingMessage.value = value;
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

		<TransitionGroup name="fade">
			<UiButton
				v-if="!isMenuOpened"
				color="white"
				class="menu-icon-wr"
				@click="toggleMenu"
			>
				<IconsBurger />
			</UiButton>
			<NuxtLink to="/">
				<UiButton
					v-if="!isMenuOpened"
					color="white"
					class="back-icon-wr"
				>
					<IconsBack />
				</UiButton>
			</NuxtLink>
		</TransitionGroup>

		<Teleport to="body">
			<Transition name="slide-right">
				<PagesProcessingMenu
					v-if="isMenuOpened"
					:filePath="filesStore.fileForProcessing?.path || ''"
					:fileId
					@toggleMenu="toggleMenu"
					@toggleIsProcessing="toggleIsProcessing"
					@setProcessingMessage="setProcessingMessage"
				/>
			</Transition>
		</Teleport>

		<UiLoader v-if="isProcessing" :message="processingMessage" />
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

	.menu-icon-wr
	{
		top: 0;
		right: -80px;
		position: absolute;
	}

	.back-icon-wr
	{
		top: 0;
		left: -80px;
		position: absolute;
	}
</style>