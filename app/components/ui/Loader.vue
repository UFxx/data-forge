<script setup lang="ts">
	defineProps<{ message?: string }>();
</script>

<template>
	<div class="loader-wr">
		<div class="loader" />
		<p
			v-if="message"
			class="message"
		>
			{{ message }}
		</p>
	</div>
</template>

<style scoped lang='scss'>
	.loader-wr
	{
		width: 100%;
		height: 100%;
		z-index: 2;
		backdrop-filter: blur(4px);

		top: 0;
		left: 0;
		z-index: 1;
		position: fixed;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loader
	{
		width: 60px;
		color: $black;
		animation: rotate 4s infinite linear;
		background:
			linear-gradient(currentColor 0 0) top   /100% 1px,
			linear-gradient(currentColor 0 0) bottom/100% 1px,
			linear-gradient(to bottom right, #0000 calc(50% - 2px),currentColor calc(50% - 1px),#0000 50%) top/100% calc(100% + 2px),
			linear-gradient(to bottom left , #0000 calc(50% - 2px),currentColor calc(50% - 1px),#0000 50%) top/100% calc(100% + 2px); 
		aspect-ratio: .577;
		background-repeat: no-repeat;

		display: grid;
	}

	.loader::before,
	.loader::after
	{
		content: "";
		border: inherit;
		animation: inherit;
		background: inherit;

		grid-area: 1/1;
	}

	.loader::after { animation-duration: 2s; }

	@keyframes rotate
	{
		100% { transform: rotate(1turn); }
	}

	.message
	{
		transform: translateY(100px);

		position: absolute;
	}
</style>