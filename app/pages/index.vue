<script setup lang="ts">
	const userStore  = useUserStore();
	const filesStore = useFilesStore();

	const file = ref<File | undefined>(undefined);

	const changeHandler = (e: Event) =>
	{
		const input = e.target as HTMLInputElement;

		if (!input.files?.length) return;

		file.value = input.files[0];
	};

	const uploadHandler = async () =>
	{
		if (!file.value) return;

		const response = await filesStore.uploadFile(file.value)

		if (response)
		{
			file.value = undefined;
			navigateTo('/processing');
		}
	};

	await filesStore.fetchFiles();
</script>

<template>
	<p>Главная</p>
	<p>Логин: {{ userStore.userLogin }}</p>
	<button @click="userStore.logout">Выйти</button>

	<div>
		<input
			@change="changeHandler"
			type="file"
			accept=".csv"
		>
		<button @click="uploadHandler" :disabled="!file">Загрузить</button>
	</div>

	<div>
		<div
			v-for="file in filesStore.files"
			:key="file.id"
		>
			<File :file />
		</div>
	</div>
</template>

<style scoped lang='scss'></style>