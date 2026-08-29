<script setup lang="ts">
	import type { RegistrationForm } from '~/types/rgistrationForm';
	import type { BaseResponse } from '~/types/baseResponse';

	const { registration : registrationApi } = useApi();

	const isLoading = ref(false);

	const registration = async (data: RegistrationForm) =>
	{
		isLoading.value = true;

		try
		{
			const response = <BaseResponse>await registrationApi.registration(data);

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
		finally { isLoading.value = false; }
	}
</script>

<template>
	<div class="registration-wr">
		<AuthForm
			title="Создайте аккаунт"
			buttonText="Создать аккаунт"
			loginPlaceholder="Alex"
			passwordPlaceholder="Введите пароль"
			:isLoading
			@submit="registration"
		>
			<div class="separator" />
			<p class="footer">
				Уже есть аккаунт?
				<NuxtLink
					class="link"
					to="/login"
				>
					Войти
				</NuxtLink>
			</p>
		</AuthForm>
	</div>
</template>

<style lang='scss' scoped>
	@use '~/assets/styles/components/auth-form-footer.scss';

	.registration-wr
	{
		height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>