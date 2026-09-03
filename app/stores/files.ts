const { files: filesApi } = useApi();
import type { FileItem, FileForProcessing } from "~/types/files";

export const useFilesStore = defineStore('filesStore', () =>
	{
		const files             = ref<FileItem[] | null>(null);
		const fileForProcessing = ref<FileForProcessing | null>(null);

		const uploadFile = async (data: File) =>
		{
			try
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
			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const fetchFiles = async (needSsr: boolean) =>
		{
			try
			{
				const response = await filesApi.fetch(needSsr);

				if (response?.success)
					setFiles(response.data);
			}
			catch (err: any) { console.error(err); }
		};

		const deleteFile = async (id: string) =>
		{
			try
			{
				const response = await filesApi.delete(id)

				if (response?.success)
					deleteFileLocaly(id);
			}
			catch(err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const renameFile = async (id: string, newName: string) =>
		{
			try
			{
				const response = await filesApi.rename(id, newName);

				if (response?.success && files.value)
				{
					const file = files.value?.find((file: FileItem) => file.id === id);

					if (file)
						file.name = newName;
				}

				return response;
			}
			catch(err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const moveFile = async (fileId: string, folderId: string) =>
		{
			try
			{
				return await filesApi.move(fileId, folderId);
			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const fetchFile = async (id: string) =>
		{
			try
			{
				const response = await filesApi.fetchFileById(id);

				if (response?.success)
					setFileForProcessing(response.data);
			}
			catch(err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
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