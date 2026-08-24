<script setup>
	const userStore = useUserStore();
</script>

<template>
	<p>Главная</p>
	<p>Логин: {{ userStore.userLogin }}</p>
	<button @click="userStore.logout">Выйти</button>
</template>

<style scoped lang='scss'></style>