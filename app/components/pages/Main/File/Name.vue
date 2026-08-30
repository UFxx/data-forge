<script setup lang="ts">
	const filesStore = useFilesStore();

	const props = defineProps<{
		id           : string,
		name         : string,
		isProcessed  : boolean,
		isRenameMode : boolean
	}>();

	const emit = defineEmits(['toggleRename']);

	const filenameInputRef = ref<HTMLInputElement | null>(null);

	const toggleRenameMode = async (value: boolean) => {
		emit('toggleRename', value);

		if (value)
		{
			await nextTick();

			filenameInputRef.value?.focus();
			filenameInputRef.value?.select();
		}
	};

	const originalName     = props.name;
	const newName          = ref<string>(originalName);

	watch(
		() => props.isRenameMode,
			async (isEditing) =>
			{
				if (isEditing)
				{
					newName.value = props.name;
					await nextTick();
					filenameInputRef.value?.focus();
					filenameInputRef.value?.select();
				}
			}
	);

	const fileLink = computed(() =>
		{
			if (!props.isRenameMode)
				return props.isProcessed ? `/processing/${props.id}` : `/file/${props.id}`
			else return '';
		}
	);

	const saveRename = async () => {
		if (newName.value === props.name || !newName.value.trim()) {
			emit('toggleRename', false);
			return;
		}

		const finalName = newName.value.endsWith('.csv')
			? newName.value
			: `${newName.value}.csv`;

		await filesStore.renameFile(props.id, finalName);
		toggleRenameMode(false);
	};

	const cancelRename = () =>
	{
		newName.value = originalName;
		toggleRenameMode(false);
	};
</script>

<template>
	<NuxtLink
		class="name"
		:to="fileLink"
	>
		<div class="icon-wr">
			<IconsCSV />
		</div>
		<input
			v-if="isRenameMode"
			ref="filenameInputRef"
			type="text"
			v-model="newName"
			@blur="saveRename"
			@keyup.enter="saveRename"
			@keyup.escape="cancelRename"
		/>
		<p v-else>{{ name }}</p>
	</NuxtLink>
</template>

<style scoped lang='scss'>
	.name
	{
		font-weight: 500;

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
</style>