import type { Folder, FoldersResponse } from "~/types/folders";

export const useFoldersStore = defineStore('foldersStore', () =>
	{
		const { folders: foldersApi } = useApi();

		const folders = ref<Folder[]>([]);

		const createFolder = async (name: string) =>
		{
			const response = await foldersApi.create(name);

			if (response?.data)
				folders.value.push(
					{
						id         : response.data.folderId,
						name       : name,
						filesCount : 0
					}
				);

			return response;
		};

		const fetchFolders = async () =>
		{
			const response = await foldersApi.fetch()

			if (response?.success)
				folders.value = response.data;
		};

		const deleteFolder = async (
			id          : string,
			withFiles   : boolean = false,
			unlinkFiles : boolean = false
		) =>
		{
			const response = await foldersApi.delete(id, withFiles, unlinkFiles);

			if (response?.success)
				folders.value = folders.value.filter((folder: Folder) => folder.id !== id)

			return response;
		};

		const renameFolder = async (id: string, newName: string) =>
		{
			const response = await foldersApi.rename(id, newName);

			if (response?.success)
			{
				const folder = folders.value?.find((folder: Folder) => folder.id === id);

				if (folder)
					folder.name = newName;
			}

			return response?.success;
		};

		const fetchFolderFiles = async (id: string) =>
		{
			const response = await foldersApi.fetchFolderById(id);

			return response;
		};

		return {
			folders,

			createFolder,
			fetchFolders,
			deleteFolder,
			renameFolder,
			fetchFolderFiles
		}
	}
);