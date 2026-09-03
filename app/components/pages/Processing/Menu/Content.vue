<script setup lang="ts">
	import type { Operation } from '~/types/operations';

	const props =  defineProps<{
		operations            : Operation,
		choosedOperationCodes : string[]
	}>();

	const emit = defineEmits(['toggleOperation']);

	const operations = computed(() => serializeOperations(props.operations));
</script>

<template>
	<div class="content">
		<UiCheckbox
			v-for="operation in operations"
			:key="operation.code"
			:id="operation.code"
			:name="operation.code"
			:label="operation.label"
			:checked="choosedOperationCodes.includes(operation.code)"
			@change="emit('toggleOperation', operation.code)"
		/>
	</div>
</template>

<style scoped lang='scss'>
	.content
	{
		padding: 16px;
		overflow-y: auto;
		scrollbar-width: thin;

		row-gap: 8px;
		display: flex;
		flex-direction: column;
	}
</style>