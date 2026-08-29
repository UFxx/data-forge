<script setup lang="ts">
	import type { FileItem } from '~/types/files';

	const filesStore = useFilesStore();

	const props = defineProps<{ file: FileItem }>();

	const isEditing              = ref<boolean>(false);
	let originalFilename: string = props.file.name;
	const filenameInput          = ref<HTMLInputElement | null>(null);
	const newFileName            = ref<string>(originalFilename);

	const changeIsEditing = (value: boolean) =>
	{
		isEditing.value   = value;

		if (!value)
			newFileName.value = originalFilename;
		else
			newFileName.value = newFileName.value.replace('.csv', '');
	};

	const rename = async () =>
	{
		if (newFileName.value === originalFilename.replace('.csv', '') || !newFileName.value) return;

		const response = await filesStore.renameFile(props.file.id, `${newFileName.value}.csv`)

		if (response?.success)
		{
			isEditing.value = false;
			originalFilename = newFileName.value;
		}
	};

	onUpdated(() =>
		{
			if (isEditing.value && filenameInput.value)
				filenameInput.value?.focus()
		}
	);
</script>

<template>
	<input
		v-if="isEditing"
		ref="filenameInput"
		v-model="newFileName"
		@blur="changeIsEditing(false)"
		@keyup.enter="rename"
	/>
	<p v-else @click="changeIsEditing(true)">{{ file.name }}</p>
	<p>{{ file.isProcessed }}</p>
	<button @click="filesStore.deleteFile(file.id)">Удалить</button>
</template>

<style scoped lang='scss'></style>