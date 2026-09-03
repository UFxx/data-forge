<script setup lang="ts">
	withDefaults(defineProps<{
		rename?               : boolean,
		delete?               : boolean,
		moveToFolder?         : boolean,
		unlinkFileFromFolder? : boolean
	}>(),
		{
			rename               : true,
			moveToFolder         : false,
			delete               : true,
			unlinkFileFromFolder : false
		}
	);

	const emit = defineEmits(['rename', 'delete', 'moveToFolder', 'unlinkFileFromFolder']);

	const isMenuOpened = ref<boolean>(false);
	const optionsRef      = ref<HTMLElement | null>(null)

	onClickOutside(optionsRef, () => isMenuOpened.value = false);
</script>

<template>
	<div
		class="wrapper"
		@click.stop="isMenuOpened=true"
	>
		<button class="menu-button">
			<IconsMenu />
		</button>
		<div
			v-if="isMenuOpened"
			class="options"
			ref="optionsRef"
		>
			<button
				v-if="rename"
				class="option"
				@click.stop="emit('rename', true)"
			>
				Переименовать
			</button>
			<button
				v-if="moveToFolder"
				class="option"
				@click.stop="emit('moveToFolder')"
			>
				Переместить в папку
			</button>
			<button
				v-if="unlinkFileFromFolder"
				class="option"
				@click.stop="emit('unlinkFileFromFolder')"
			>
				Удалить из папки
			</button>
			<button
				v-if="delete"
				class="option option--delete"
				@click.stop="emit('delete')"
			>
				Удалить
			</button>
		</div>
	</div>
</template>

<style scoped lang='scss'>
	.wrapper { position: relative; }

	.menu-button
	{
		width: 44px;
		color: $light-gray;
		height: 44px;

		display: flex;
		align-items: center;
		justify-content: center;

		&:hover svg { color: $black; }

		svg { @include tr(0.3, color); }
	}

	.options
	{
		border: 1px solid $lighter-gray;
		z-index: 1;
		overflow: hidden;
		border-radius: 8px;
		background-color: $white;

		top: 70%;
		right: 0;
		position: absolute;
	}

	.option
	{
		width: 100%;
		padding: 6px 12px;
		font-size: 12px;
		text-align: left;
		color: $light-gray;

		@include tr(0.3, color, background-color);

		&:hover
		{
			color: $black;
			background-color: darken($white, 2);
		}

		&--delete
		{
			color: $red;

			&:hover { color: $red; }
		}
	}
</style>