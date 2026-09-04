import Papa from 'papaparse';
import type { useFilesStore } from '~/stores/files';

export const useFormatCsv = (store: ReturnType<typeof useFilesStore>) =>
{
	const fileHeaders = ref<string[]>([]);
	const fileData    = ref<Record<string, any>[]>([]);

	const parseData = (text: string | undefined) =>
	{1
		if (!text) return;

		Papa.parse<Record<string, any>>(text,
		{
			header: true,
			preview: 500,
			complete(results)
			{
				fileData.value    = results.data;
				fileHeaders.value = results.meta.fields || [];
			}
		});
	};

	watch(
		() => store.fileForProcessing?.text,
		(newText) => parseData(newText),
		{ immediate: true }
	);

	return { fileHeaders, fileData };
};