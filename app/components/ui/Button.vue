<script setup lang="ts">
	withDefaults(
		defineProps<{
			color?    : 'black' | 'white',
			disabled? : boolean
		}>(),
		{
			color    : 'black',
			disabled : false
		}
	);
</script>

<template>
	<button
		class="button"
		:class="color"
		:disabled
	>
		<slot />
	</button>
</template>

<style scoped lang='scss'>
	.button
	{
		padding: 12px;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		border-radius: 8px;

		display: flex;
		column-gap: 10px;
		align-items: center;
		flex-shrink: 0;
		justify-content: center;

		@include tr(0.3, opacity);

		&:hover { opacity: 0.85; }

		&:disabled
		{
			opacity: 0.85;
			pointer-events: none;
		}

		&.black
		{
			color: $white;
			background-color: $black;
		}

		&.white
		{
			color: $black;
			border: 1px solid $lighter-gray;
			background-color: $white;

			&:hover { opacity: 0.7; }
		}
	}
</style>