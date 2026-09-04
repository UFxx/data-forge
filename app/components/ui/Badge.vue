<script setup></script>

<template>
	<div class="badge">
		<slot />
	</div>
</template>

<style scoped lang='scss'>
	.badge
	{
		padding: 0 8px;
		border-radius: 100px;
		background-color: $lighter-gray;

		display: flex;
		column-gap: 4px;
		align-items: center;
	}
</style>