<script setup lang="ts">
	defineProps<{
		id      : string,
		name    : string,
		label   : string,
		checked : boolean
	}>();

	const emit = defineEmits(['change']);
</script>

<template>
	<label class="checkbox" :for="id">
		<input
			type="checkbox"
			class="input"
			:name="id"
			:id="id"
			:checked
			@change="emit('change')"
		>
		<span class="box"></span>
		<span class="checkbox__label">{{ label }}</span>
	</label>
</template>

<style scoped lang="scss">
	.checkbox
	{
		cursor: pointer;
		user-select: none;

		gap: 8px;
		display: inline-flex;
		align-items: center;
	}

	.box
	{
		width: 18px;
		height: 18px;
		border: 2px solid $black;
		border-radius: 3px;
		background-color: $white;

		@include tr(0.3, outline, border-color, background-color);

		flex-shrink: 0;
		position: relative;

		&::after
		{
			width: 1px;
			height: 7px;
			opacity: 0;
			content: '';
			transform: rotate(45deg) ;
			background-color: $white;

			top: 3px;
			left: 6.5px;
			position: absolute;

			@include tr(0.3, opacity, transform);
		}

		&::before
		{
			width: 1px;
			height: 7px;
			opacity: 0;
			content: '';
			transform: rotate(-45deg) ;
			background-color: $white;

			top: 3px;
			left: 6.5px;
			position: absolute;

			@include tr(0.3, opacity, transform);
		}
	}

	.checkbox__label
	{
		color: $black;
		font-size: 14px;
		line-height: 1.4;
	}

	.input
	{
		width: 0;
		height: 0;
		opacity: 0;

		position: absolute;

		&:focus-visible + .box
		{
			outline: 2px solid $black;
			outline-offset: 2px;
		}

		&:checked + .box
		{
			border-color: $black;
			background-color: $black;

			&::after { opacity: 1; }
			&::before { opacity: 1; }
		}
	}
</style>