import type { FileItem, FileForProcessing } from "~/types/files";

const {
	files: filesApi,
	preprocessing: preprocessingApi
} = useApi();

export const useFilesStore = defineStore('filesStore', () =>
	{
		const files             = ref<FileItem[] | null>(null);
		const fileForProcessing = ref<FileForProcessing | null>(null);

		// API
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

		const fetchFile = async (id: string) =>
		{
			const response = await filesApi.fetchFileById(id);

			if (response?.success)
				setFileForProcessing(response.data);
		};


		const startPreprocessing = async (path: string, args: string) =>
		{
			const response = await preprocessingApi.preprocessing(path, args);
			return response;
		}

		const checkProcessingStatus = async (path: string) =>
		{
			const response = await preprocessingApi.check(path);
			return response;
		};

		// Actions
		const setFiles = (data: FileItem[]) => files.value = data;

		const deleteFileLocaly = (id: string) =>
		{
			if (files.value)
				setFiles(files.value?.filter((file: FileItem) => file.id !== id));
		};

		const addFile = (file: FileItem) => files.value?.push(file);

		const setFileForProcessing = (file: FileForProcessing) => fileForProcessing.value = file;

		return {
			files,
			fileForProcessing,

			moveFile,
			fetchFile,
			renameFile,
			uploadFile,
			fetchFiles,
			deleteFile,
			startPreprocessing,
			checkProcessingStatus,

			addFile,
			setFiles,
			deleteFileLocaly,
			setFileForProcessing
		}
	}
);