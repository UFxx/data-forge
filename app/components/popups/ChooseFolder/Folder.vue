<script setup lang="ts">
	const props = defineProps<{
		id              : string,
		name            : string,
		disabled        : boolean,
		filesCount      : number,
		currentFolderId : string | null
	}>();

	const emit = defineEmits(['choose']);

	const chooseFolder = () => emit('choose', props.id);

	const isChoosedFolder = computed(() => props.id === props.currentFolderId);
</script>

<template>
	<div
		class="folder"
		:class="{
			'active': isChoosedFolder,
			'disabled': disabled
		}"
		@click="chooseFolder"
	>
		<div class="icon-wr">
			<IconsFolder />
		</div>
		<div class="meta">
			<p class="name">{{ name }}</p>
			<p class="files-count">{{ pluralize(filesCount, ['файл', 'файла', 'файлов']) }}</p>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.folder
	{
		cursor: pointer;

		display: flex;
		column-gap: 12px;
		align-items: center;
		border-radius: 8px;

		&.active { background-color: rgba($black, 0.2); }
		&.disabled
		{
			opacity: 0.5;
			pointer-events: none;
		}
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

	.files-count
	{
		font-size: 12px;
		line-height: 16px;
	}
</style>