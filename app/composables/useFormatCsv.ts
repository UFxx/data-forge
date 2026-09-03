import Papa from 'papaparse';

export const useFormatCsv = (data: string | undefined) =>
{
	const fileHeaders = ref<string[]>([])
	const fileData    = ref<Record<string, any>[]>([]);

	if (data)
		Papa.parse<Record<string, any>>(data,
			{
				header: true,
				preview: 500,
				complete(results)
				{
					fileData.value    = results.data;
					fileHeaders.value = results.meta.fields || [];
				}
			}
		);

	return { fileHeaders, fileData };
};