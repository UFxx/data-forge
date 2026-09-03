<script setup lang="ts">
	import type { RegistrationForm } from '~/types/registrationForm';

	const userStore = useUserStore();

	const isLoading = ref(false);

	const registration = async (data: RegistrationForm) =>
	{
		isLoading.value = true;

		const response = await userStore.registration(data);

		if (response && response.success)
		{
			navigateTo('/login');
			console.log(response.message);
		}

		isLoading.value = false;
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