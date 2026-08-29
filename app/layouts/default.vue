<script setup lang="ts">
	useSeoMeta({ title: 'Data Forge'});

	const nuxtApp        = useNuxtApp();
	const userStore      = useUserStore();

	nuxtApp.hook("page:finish", () => { getScrollbarWidth(); });

	const handleResize = useDebounceFn(() => getScrollbarWidth(), 200);

	useEventListener('resize', handleResize);

	await userStore.getCurrentUser();
</script>


<template>
	<div class="default-layout">
		<main>
			<div class="container">
				<Transition name="room-top">
					<NuxtPage />
				</Transition>
			</div>
		</main>
	</div>

	<PopupWrapper />
</template>

<style lang="scss">
	.default-layout
	{
		min-height: 100vh;

		display: flex;
		flex-direction: column;

		main
		{
			background-color: $white;

			flex: 1;
		}
	}
</style>