<script setup>
	const userStore = useUserStore();
</script>

<template>
	<div class="profile">
		<p class="username">{{ userStore.userLogin }}</p>
		<UiButton
			class="logout"
			color="white"
			@click="userStore.logout"
		>
			<IconsExit />
			Выйти
		</UiButton>
	</div>
</template>

<style scoped lang='scss'>
	.profile
	{
		height: max-content;
		border: 1px solid $lighter-gray;
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 1px 3px 0 rgba(black, 0.1);

		display: flex;
		align-items: center;
		justify-content: space-between;

		.logout { color: $gray; }
	}
</style>