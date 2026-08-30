<script setup lang="ts">
	import type { LoginForm } from '~/types/loginForm';

	defineProps<{
		title               : string,
		buttonText          : string,
		loginPlaceholder    : string,
		passwordPlaceholder : string,
		isLoading           : boolean
	}>();

	const loginForm = ref<LoginForm>(
		{
			login    : null,
			password : null
		}
	);

	const { requiredField, passwordField } = useValidation();

	const { r$ } = useRegle(loginForm, {
		...requiredField('login'),
		...passwordField('password'),
	});

	const emit = defineEmits(['submit']);

	const submit = async () =>
	{
		const { valid } = await r$.$validate();

		if (!valid)
			return;

		emit('submit', loginForm.value);
	}
</script>

<template>
	<div class="form-container">
		<UiTitle :text="title" />
		<div class="form">
			<UiInput
				label="Логин"
				:placeholder="loginPlaceholder"
				v-model="loginForm.login"
				:error="r$.login?.$errors[0]"
			/>
			<UiInput
				label="Пароль"
				:placeholder="passwordPlaceholder"
				type="password"
				v-model="loginForm.password"
				:error="r$.password?.$errors[0]"
				@submit="submit"
			/>
			<UiButton
				:disabled="isLoading"
				@click="submit"
			>
				{{ buttonText }}
			</UiButton>
		</div>
		<slot />
	</div>
</template>

<style scoped lang='scss'>
	.form-container
	{
		width: 400px;
		border: 1px solid $lighter-gray;
		padding: 32px;
		border-radius: 8px;
		box-shadow: 0 1px 2px -1px rgba($black, 0.1);

		row-gap: 28px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.form
	{
		row-gap: 20px;
		display: flex;
		flex-direction: column;
	}
</style>