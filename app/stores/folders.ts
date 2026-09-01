import type { Folder } from "~/types/folders";

export const useFoldersStore = defineStore('foldersStore', () =>
	{
		const { folders: foldersApi } = useApi();

		const folders = ref<Folder[]>([]);

		const createFolder = async (name: string) =>
		{
			try
			{
				const response = await foldersApi.create(name);

				if (response.success)
				{
					folders.value.push(
						{
							id         : response.data.folderId,
							name       : name,
							filesCount : 0
						}
					);

					useToast(response.message);
				}

				return response.success;
			}
			catch(err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const fetchFolders = async () =>
		{
			try
			{
				const response = await foldersApi.fetch()

				if (response.success)
					folders.value = response.data;
			}
			catch (err) { console.error(err); }
		};

		const deleteFolder = async (id: string) =>
		{
			try
			{
				const response = await foldersApi.delete(id);

				if (response.success)
				{
					folders.value = folders.value.filter((folder: Folder) => folder.id !== id)

					useToast(response.message);
				}

			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const renameFolder = async (id: string, newName: string) =>
		{
			try
			{
				const response = await foldersApi.rename(id, newName);

				if (response.success)
				{
					const folder = folders.value?.find((folder: Folder) => folder.id === id);

					if (folder)
						folder.name = newName;

					useToast(response.message);
				}

				return response.success;
			}
			catch(err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		};

		const fetchFolderFiles = async (id: string) =>
		{
			try
			{
				const response = await foldersApi.fetchFolderById(id);

				return response;
			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
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