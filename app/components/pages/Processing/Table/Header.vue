<script setup lang="ts">
	defineProps<{ headers: string[] }>();
</script>

<template>
	<thead class="header">
		<tr class="header-row">
			<td
				v-for="header in headers"
				:key="header"
				class="header-cell"
			>
				{{ header }}
			</td>
		</tr>
	</thead>
</template>

<style scoped lang='scss'>
	.header-cell
	{
		border: 1px solid $black;
		padding: 5px;
		text-align: center;
		font-weight: 600;
		font-size: 14px;
		text-transform: capitalize;
		background-color: $white;

		top: 0;
		position: sticky;
	}
</style>