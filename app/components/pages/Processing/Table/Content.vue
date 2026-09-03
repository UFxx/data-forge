<script setup lang="ts">
	defineProps<{ content: object[] }>();
</script>

<template>
	<tbody class="content">
		<tr
			v-for="(row, idx) in content"
			:key="idx"
			class="content-row"
		>
			<td
				v-for="cell in row"
				:key="cell"
				class="content-cell"
			>
				{{ cell }}
			</td>
		</tr>
	</tbody>
</template>

<style scoped lang='scss'>
	.content { border: 1px solid $light-gray; }

	.content-row
	{
		@include tr(0.3, background-color, border-color);

		&:nth-child(odd) { background-color: rgba($light-gray, 0.2); }
		&:hover
		{
			background-color: rgba($green, 0.2);

			.content-cell { border-right: 1px solid rgba($green, 0.2); }
		}
	}

	.content-cell
	{
		padding: 3px;
		border-right: 1px solid $light-gray;

		@include tr(0.3, background-color);

		&:last-child { border: none; }

		&:hover
		{
			background-color: rgba($green, 0.2);
		}
	}
</style>