<script setup lang="ts">
	const toastsStore = useToastsStore();

	const closeToast = (id: number) => toastsStore.removeToast(id);
</script>

<template>
	<TransitionGroup
		class="toaster"
		name="toaster"
		tag="div"
	>
		<ToasterItem
			v-for="toast in toastsStore.toasts"
			:key="toast.id"
			:id="toast.id"
			:type="toast.type"
			:text="toast.text"
			@close="closeToast"
		/>
	</TransitionGroup>
</template>

<style scoped lang='scss'>
	.toaster
	{
		row-gap: 10px;
		z-index: 3;

		bottom: 10px;
		right: 10px;
		display: flex;
		position: fixed;
		align-items: flex-end;
		flex-direction: column;
	}
</style>