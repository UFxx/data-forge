<script setup lang="ts">
	useSeoMeta({ title: 'Data Forge'});

	const nuxtApp     = useNuxtApp();
	const userStore   = useUserStore();
	const popupsStore = usePopupsStore();

	nuxtApp.hook("page:finish", () => { getScrollbarWidth(); });

	const handleResize = useDebounceFn(() => getScrollbarWidth(), 200);

	useEventListener('resize', handleResize);
	onKeyStroke('Escape', () => popupsStore.closeAnyPopup());

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

	<ClientOnly>
		<Teleport to="main">
			<Transition name="fade">
				<PopupWrapper />
			</Transition>
		</Teleport>
	</ClientOnly>
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