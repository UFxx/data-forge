<script setup lang="ts">
	withDefaults(
		defineProps<{
			type?       : string,
			label       : string,
			error?      : string,
			placeholder : string,
		}>(), { type: 'text' }
	);

	const model = defineModel();

	const inputRef = ref<HTMLInputElement | null>(null);

	const emit = defineEmits(['submit']);

	const clickHandler = () =>
	{
		if (inputRef.value)
			inputRef.value.focus();
	}
</script>

<template>
	<div class="input-wr">
		<span
			@click="clickHandler"
			class="label"
		>
			{{ label }}
		</span>
		<input
			class="input"
			:class="{ 'error': error }"
			ref="inputRef"
			:type
			:placeholder
			@keyup.enter="emit('submit')"
			v-model="model"
		/>
		<Transition name="fade">
			<span v-if="error" class="error-label">{{ error }}</span>
		</Transition>
	</div>
</template>

<style scoped lang='scss'>
	.input-wr
	{
		row-gap: 8px;
		display: flex;
		flex-direction: column;
	}

	.label
	{
		width: max-content;
		cursor: pointer;
		font-size: 14px;
		user-select: none;
		font-weight: 500;
		line-height: 20px;
	}

	.input
	{
		border: 1px solid #E4E4E7;
		padding: 12px;
		font-size: 14px;
		max-height: 44px;
		border-radius: 8px;

		@include tr(0.3, border-color, color);

		&::placeholder
		{
			color: $light-gray;
			font-size: 14px;

			@include tr(0.3, color);
		}

		&:focus { border-color: $black; }

		&.error
		{
			color: red;
			border-color: red;

			&::placeholder { color: red; }
		}
	}

	.error-label
	{
		color: red;
		font-size: 12px;
	}
</style>