<script setup>
    useSeoMeta({ title: 'Data Forge'});
</script>


<template>
	<div class="default-layout">
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	</div>

	<PopupWrapper />
</template>

<style lang="scss">
	.default-layout
	{
		display: flex;
		min-height: 100vh;
		flex-direction: column;

		main { flex: 1; }
	}
</style>