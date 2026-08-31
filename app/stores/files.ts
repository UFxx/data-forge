const { files: filesApi } = useApi();
import type { FileItem } from "~/types/files";

export const useFilesStore = defineStore('filesStore', () =>
	{
		const files             = ref<FileItem[] | null>(null);
		const fileForProcessing = ref<string | null>(null);

		const uploadFile = async (data: File) =>
		{
			try
			{
				const payload = new FormData();
				payload.append('file', data);

				const response = await filesApi.upload(payload);

				if (response.success)
				{
					fileForProcessing.value = await data.text();
					console.log(response.message);
				}

				return response.success;
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

		const deleteFile = async (id: string) =>
		{
			try
			{
				const response = await filesApi.delete(id)

				if (response.success)
				{
					deleteFileLocaly(id);
					console.log(response.message);
				}
			}
			catch(err: any) { console.error(err); }
		};

		const renameFile = async (id: string, newName: string) =>
		{
			try
			{
				const response = await filesApi.rename(id, newName);

				if (response.success && files.value)
				{
					const file = files.value?.find((file) => file.id === id);

					if (file)
						file.name = newName;

					console.log(response.message);
				}

				return response;
			}
			catch(err: any) { console.error(err); }
		};

		const moveFile = async (fileId: string, folderId: string) =>
		{
			try
			{
				const response = await filesApi.move(fileId, folderId);

				return response;
			}
			catch (err: any) { console.error(err) }
		};

		const setFiles = (data: FileItem[]) => files.value = data;

		const deleteFileLocaly = (id: string) =>
		{
			if (files.value)
				setFiles(files.value?.filter((file) => file.id !== id));
		};

		const addFile = (file: FileItem) => files.value?.push(file);

		return {
			files,
			fileForProcessing,

			addFile,
			setFiles,
			deleteFileLocaly,

			uploadFile,
			fetchFiles,
			deleteFile,
			renameFile,
			moveFile
		}
	}
);