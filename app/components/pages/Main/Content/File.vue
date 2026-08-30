<script setup lang="ts">
	defineProps<{
			id          : string,
			size        : number,
			name        : string,
			isProcessed : boolean
		}>();
</script>

<template>
	<div class="file">
		<NuxtLink
			class="name"
			:to="isProcessed ? `/processing/${id}` : `/file/${id}`"
		>
			<div class="icon-wr">
				<IconsCSV />
			</div>
			<p>{{ name }}</p>
		</NuxtLink>
		<div class="meta">
			<p>{{ formatFileSize(size) }}</p>
			<button class="menu">
				<IconsMenu />
			</button>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.file
	{
		padding: 14px 16px;
		border-bottom: 1px solid #E4E4E7;

		display: flex;
		justify-content: space-between;

		@include tr(0.3, background-color);

		&:hover { background-color: darken($white, 1); }

		&:last-child { border-bottom: none; }
	}

	.name
	{
		font-weight: 500;
		line-height: 20px;

		display: flex;
		column-gap: 12px;
		align-items: center;

		&:hover p { transform: translateX(4px); }

		p { @include tr(0.3, transform); }
	}

	.icon-wr
	{
		padding: 9px;
		border-radius: 8px;
		background-color: #F9F9FB;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu
	{
		width: 44px;
		color: $light-gray;
		height: 44px;

		display: flex;
		justify-content: center;
		align-items: center;

		@include tr(0.3, color);

		&:hover { color: $black; }
	}

	.meta
	{
		font-size: 12px;
		line-height: 16px;

		display: flex;
		column-gap: 12px;
		align-items: center;
	}
</style>