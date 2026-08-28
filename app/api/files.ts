import type { BaseResponse } from "~/types/baseResponse"
import type { FilesResponse } from "~/types/files"

export default {
	upload: async (payload: FormData) => await useRequest<BaseResponse>('/files/upload',
		{
			method: 'POST',
			body: payload
		}
	),

	fetch: async () => await useRequest<FilesResponse>('/files')
}