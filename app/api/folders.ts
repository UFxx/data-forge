import { type BaseResponse } from "~/types/baseResponse"
import type { CreateFolderResponse, FoldersResponse } from "~/types/folders"
import { type FilesResponse } from "~/types/files"

export default {
	create: async (name: string) => await useRequest<CreateFolderResponse>('/folders',
		{
			method: 'POST',
			body: { name }
		}
	),

	fetch: async () => await useRequest<FoldersResponse>('/folders'),
	delete: async (id: string) => await useRequest<BaseResponse>(`/folders/${id}`, { method: 'DELETE' }),

	rename: async (id: string, newName: string) => await useRequest<BaseResponse>(`/folders/${id}`,
		{
			method: 'PATCH',
			body: { newName }
		}
	),

	fetchFolderById: async (id: string) => await useRequest<FilesResponse>(`/folders/${id}`)
}