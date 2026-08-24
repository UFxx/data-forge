<script setup lang="ts">
	useSeoMeta({ title: 'Data Forge'});

	const nuxtApp   = useNuxtApp();
	const userStore = useUserStore();

	nuxtApp.hook("page:finish", () => { getScrollbarWidth(); });

	const handleResize = useDebounceFn(() => getScrollbarWidth(), 200);

	useEventListener('resize', handleResize);

	await userStore.getCurrentUser();
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