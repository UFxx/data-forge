<script setup lang="ts">
	import { type LoginForm, type LoginFormResponse } from '~/types/loginForm';

	const { login : loginApi } = useApi();
	const userStore            = useUserStore();

	const loginForm = ref<LoginForm>(
		{
			login    : null,
			password : null
		}
	);

	const forgeJWTCookie = useCookie('forgeJWT', { default: () => '' });

	const login = async () =>
	{
		try
		{
			const response = <LoginFormResponse>await loginApi.login(loginForm.value);

			if (response.success)
			{
				forgeJWTCookie.value = response.token;
				userStore.setUserLogin(response.login);

				console.log(response.message);
			}

		}
		catch (err: any)
		{
			console.error(err);
			console.log(err.data.message);
		}
	}
</script>

<template>
	<div class="login">
		<div class="input-wr">
			<label for="login-input-username">Логин</label>
			<input
				type="text"
				id="login-input-username"
				autocomplete="username"
				placeholder="Alex"
				v-model="loginForm.login"
			/>
		</div>
		<div class="input-wr">
			<label for="login-input-password">Пароль</label>
			<input
				type="password"
				id="login-input-password"
				v-model="loginForm.password"
			/>
		</div>

		<button type="button" @click="login">Войти</button>

		<p v-if="userStore.userLogin">{{ userStore.userLogin }}</p>
	</div>
</template>

<style lang='scss' scoped>
	.input-wr
	{
		width: max-content;

		row-gap: 10px;
		display: flex;
		flex-direction: column;

		input { border: 1px solid white; }
	}

</style>