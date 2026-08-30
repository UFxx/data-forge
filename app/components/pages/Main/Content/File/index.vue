<script setup lang="ts">
	const filesStore = useFilesStore();

	const props = defineProps<{
		id          : string,
		size        : number,
		name        : string,
		isProcessed : boolean
	}>();

	const isMenuOpened = ref<boolean>(false);
	const isRenameMode = ref<boolean>(false);
	const menuRef      = ref<HTMLElement | null>(null)

	onClickOutside(menuRef, () => isMenuOpened.value = false);

	const toggleRenameMode = (value: boolean) =>
	{
		isRenameMode.value = value;
		isMenuOpened.value = false;
	};

	const deleteFile = async () => await filesStore.deleteFile(props.id);
</script>

<template>
	<div class="file">
		<PagesMainContentFileName
			:id
			:name
			:isProcessed
			:isRenameMode
			@toggleRename="toggleRenameMode"
		/>
		<div class="meta">
			<p>{{ formatFileSize(size) }}</p>
			<button
				class="menu"
				@click="isMenuOpened=true"
			>
				<IconsMenu />
			</button>
		</div>
		<Transition name="fade">
			<PagesMainContentFileOptions
				v-if="isMenuOpened"
				ref="menuRef"
				class="options"
				@rename="toggleRenameMode"
				@delete="deleteFile"
			/>
		</Transition>
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

	.menu
	{
		width: 44px;
		color: $light-gray;
		height: 44px;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover svg { color: $black; }

		svg { @include tr(0.3, color); }
	}

	.meta
	{
		font-size: 12px;
		line-height: 16px;

		display: flex;
		column-gap: 12px;
		align-items: center;
	}

	.options
	{
		z-index: 1;

		top: 70%;
		left: 95%;
		position: absolute;
	}
</style>