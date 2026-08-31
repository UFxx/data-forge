<script setup lang="ts">
	const props = defineProps<{
		id   : number,
		type : 'success' | 'error' | 'info'
		text : string
	}>();

	const emit = defineEmits(['close']);

	const closeToast = () => emit("close", props.id);
</script>

<template>
	<div
		class="toast"
		:class="type"
		@click="closeToast"
	>
		<p class="text">{{ text }}</p>
	</div>
</template>

<style lang="scss">
	.toast
	{
		padding: 5px 10px;
		font-size: 16px;
		max-width: 240px;
		border-radius: 4px;

		&.error { background-color: $red; }
		&.success { background-color: $green; }
		&.info { background-color: $orange; }
	}

	.text
	{
		color: $white;
		text-align: center;
		user-select: none;
		overflow-wrap: break-word;
	}
</style>