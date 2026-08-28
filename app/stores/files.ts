const { files: filesApi } = useApi();
import type { FileItem } from "~/types/files";

export const useFilesStore = defineStore('filesStore', () =>
	{
		const files = ref<FileItem[] | null>(null);

		const upload = async (data: File) =>
		{
			try
			{
				const payload = new FormData();
				payload.append('file', data);

				const response = await filesApi.upload(payload)

				return response.success
			}
			catch (err: any) { console.error(err); }
		};

		const fetchFiles = async () =>
		{
			try
			{
				const response = await filesApi.fetch();

				if (response.success)
					setFiles(response.data);
			}
			catch (err: any) { console.error(err); }
		};

		const setFiles = (data: FileItem[]) => files.value = data;

		return {
			files,

			setFiles,

			upload,
			fetchFiles,
		}
	}
);