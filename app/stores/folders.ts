export const useFoldersStore = defineStore('foldersStore', () =>
	{
		const { folders: foldersApi } = useApi();

		const folders = ref(null);

		const createFolder = async (name) =>
		{
			try
			{
				const response = await foldersApi.create(name);

				// if (response.success)
				// 	folders.push(...)
			}
			catch(err: any)
			{
				console.error(err);
			}
		};

		return {
			folders,

			createFolder
		}
	}
);