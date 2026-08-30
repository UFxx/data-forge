<script setup>
	const emit = defineEmits(['rename', 'delete']);
</script>

<template>
	<div class="options">
		<button
			class="option"
			@click="emit('rename', true)"
		>
			Переименовать
		</button>
		<button
			class="option option--delete"
			@click="emit('delete')"
		>
			Удалить
		</button>
	</div>
</template>

<style scoped lang='scss'>
	.options
	{
		border: 1px solid $lighter-gray;
		overflow: hidden;
		border-radius: 8px;
		background-color: $white;
	}

	.option
	{
		width: 100%;
		padding: 6px 12px;
		font-size: 12px;
		text-align: left;
		color: $light-gray;

		@include tr(0.3, color, background-color);

		&:hover
		{
			color: $black;
			background-color: darken($white, 2);
		}

		&--delete
		{
			color: red;

			&:hover { color: red; }
		}
	}
</style>