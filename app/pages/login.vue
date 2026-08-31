<script setup lang="ts">
	import type { LoginForm } from '~/types/loginForm';

	const userStore = useUserStore();

	const isLoading = ref(false);

	const forgeJWTCookie = useCookie('forgeJWT', { default: () => '' });

	const login = async (data: LoginForm) =>
	{
		isLoading.value = true;

		const response = await userStore.login(data);

		if (response && response.success)
		{
			forgeJWTCookie.value = response.token;
			userStore.setUserLogin(response.login);
			navigateTo('/');
		}

		isLoading.value = false;
	}
</script>

<template>
	<div class="login-wr">
		<AuthForm
			title="С возвращением"
			buttonText="Вход"
			loginPlaceholder="Alex"
			passwordPlaceholder="Введите пароль"
			:isLoading
			@submit="login"
		>
			<div class="separator" />
			<p class="footer">
				Нет аккаунта?
				<NuxtLink
					class="link"
					to="/registration"
				>
					Зарегистрироваться
				</NuxtLink>
			</p>
		</AuthForm>
	</div>
</template>

<style lang='scss' scoped>
	@use '~/assets/styles/components/auth-form-footer.scss';

	.login-wr
	{
		height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>