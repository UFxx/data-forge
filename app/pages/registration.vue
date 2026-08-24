<script setup lang="ts">
	import type { RegistrationForm } from '~/types/rgistrationForm';
	import type { BaseResponse } from '~/types/baseResponse';

	const { registration : registrationApi } = useApi();

	const registrationForm = ref<RegistrationForm>(
		{
			login    : null,
			password : null
		}
	);

	const registration = async () =>
	{
		try
		{
			const response = <BaseResponse>await registrationApi.registration(registrationForm.value);

			if (response.success)
			{
				navigateTo('/login');
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
			<label for="login-input-username">Регистрация</label>
			<input
				type="text"
				id="login-input-username"
				autocomplete="username"
				placeholder="Alex"
				v-model="registrationForm.login"
			/>
		</div>
		<div class="input-wr">
			<label for="login-input-password">Пароль</label>
			<input
				type="password"
				id="login-input-password"
				v-model="registrationForm.password"
			/>
		</div>

		<button type="button" @click="registration">Зарегистрироваться</button>
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