<script setup lang="ts">
	const popupsStore = usePopupsStore();

	const isOpened = computed<boolean>(() => popupsStore.activePopupName !== null);
</script>

<template>
	<div
		v-if="isOpened"
		class="popup-container"
	>
		<div
			class="background"
			@click="popupsStore.closeAnyPopup"
		/>
		<div class="popup-wr">
			<div
				class="close-wr"
				@click="popupsStore.closeAnyPopup"
			>
				<IconsPlus class="close" />
			</div>
			<component :is="popupsStore.activePopupComponent" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.popup-container
	{
		width: 100%;
		height: 100%;
		z-index: 1;

		top: 0;
		left: 0;
		position: absolute;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.background
	{
		width: 100%;
		height: 100%;
		cursor: pointer;
		backdrop-filter: blur(4px);
		background-color: rgba($black, 0.3);

		position: absolute;
	}

	.popup-wr
	{
		z-index: 2;

		position: relative;
	}

	.close-wr
	{
		width: 32px;
		cursor: pointer;
		height: 32px;
		opacity: 0.5;
		border-radius: 8px;
		background-color: $white;

		top: 0;
		left: calc(100% + 24px);
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;

		@include tr(0.3, opacity);

		&:hover
		{
			opacity: 1;

			svg { color: $red; }
		}

		svg { @include tr(0.3, color); }
	}

	.close
	{
		color: $black;
		width: 16px;
		height: 16px;
		transform: rotate(45deg);
	}
</style>