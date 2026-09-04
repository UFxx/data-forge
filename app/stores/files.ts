const { files: filesApi } = useApi();
import type { FileItem, FileForProcessing } from "~/types/files";

export const useFilesStore = defineStore('filesStore', () =>
	{
		const files             = ref<FileItem[] | null>(null);
		const fileForProcessing = ref<FileForProcessing | null>(null);

		const uploadFile = async (data: File) =>
		{
			const payload = new FormData();
			payload.append('file', data);

			const response = await filesApi.upload(payload);

			if (response?.success)
			{
				const fileText = await data.text();
				setFileForProcessing(
					{
						id   : response.data?.fileId,
						name : response.data?.originalName,
						path : response.data?.filePath,
						text : fileText
					}
				)
			}

			return response;
		};

		const fetchFiles = async () =>
		{
			const response = await filesApi.fetch();

			if (response?.success)
				setFiles(response.data);
		};

		const deleteFile = async (id: string) =>
		{
			const response = await filesApi.delete(id)

			if (response?.success)
				deleteFileLocaly(id);
		};

		const renameFile = async (id: string, newName: string) =>
		{
			const response = await filesApi.rename(id, newName);

			if (response?.success && files.value)
			{
				const file = files.value?.find((file: FileItem) => file.id === id);

				if (file)
					file.name = newName;
			}

			return response;
		};

		const moveFile = async (fileId: string, folderId: string) => await filesApi.move(fileId, folderId);

		const fetchFile = async (id: string, isSsr: boolean) =>
		{
			const response = await filesApi.fetchFileById(id, isSsr);

			if (response?.success)
				setFileForProcessing(response.data);
		};

		const setFiles = (data: FileItem[]) => files.value = data;

		const deleteFileLocaly = (id: string) =>
		{
			if (files.value)
				setFiles(files.value?.filter((file: FileItem) => file.id !== id));
		};

		const addFile = (file: FileItem) => files.value?.push(file);

		const setFileForProcessing = (file: FileForProcessing) =>
		{
			if (fileForProcessing.value?.id === file.id)
				return;

			fileForProcessing.value = file;
		};

		return {
			files,
			fileForProcessing,

			addFile,
			setFiles,
			deleteFileLocaly,
			setFileForProcessing,

			uploadFile,
			fetchFiles,
			deleteFile,
			renameFile,
			fetchFile,
			moveFile
		}
	}
);