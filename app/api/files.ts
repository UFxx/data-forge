import type { BaseResponse } from "~/types/baseResponse"
import type { FilesResponse, UploadFileResponse, GetFile } from "~/types/files"

export default {
	upload: async (payload: FormData) => await useRequest<UploadFileResponse>('/files',
		{
			method: 'POST',
			body: payload
		}
	),

	fetch: async () => await useRequest<FilesResponse>('/files'),
	delete: async (id: string) => await useRequest<BaseResponse>(`/files/${id}`, { method: 'DELETE' }),
	rename: async (id: string, newName: string) => await useRequest<BaseResponse>(`/files/${id}`,
		{
			method: 'PATCH',
			body: { newName }
		}
	),

	move: async (fileId: string, folderId: string) => await useRequest<BaseResponse>(`/files/move/${fileId}`,
		{
			method: 'PATCH',
			body: { folderId }
		}
	),

	fetchFileById: async (id: string, isSsr: boolean) => await useRequest<GetFile>(`/files/${id}`, { isSsr })
}