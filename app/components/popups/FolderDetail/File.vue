<script setup lang="ts">
	const props = defineProps<{
		id   : string,
		name : string,
		size : number
	}>();
</script>

<template>
	<NuxtLink :to="`/file/${id}`" class="file">
		<div class="icon-wr">
			<IconsCSV />
		</div>
		<div class="meta">
			<p class="name">{{ name }}</p>
			<p class="size">{{ formatFileSize(size) }}</p>
		</div>
	</NuxtLink>
</template>

<style scoped lang='scss'>
	.file
	{
		cursor: pointer;

		display: flex;
		column-gap: 12px;
		align-items: center;
		border-radius: 8px;

		@include tr(0.3, background-color);

		&:hover { background-color: rgba($black, 0.1); }
	}

	.icon-wr
	{
		width: 44px;
		height: 44px;
		border: 1px solid $lighter-gray;
		background-color: $white;
		border-radius: 8px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.meta
	{
		display: flex;
		row-gap: 4px;
		flex-direction: column;
	}

	.name { font-weight: 500; }
</style>