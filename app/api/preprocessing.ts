import { type BaseResponse } from "~/types/baseResponse"

export default {
	preprocessing: async (path: string, args: string) => await useRequest<BaseResponse>(`/preprocessing`,
		{
			method: 'POST',
			body:
			{
				path,
				args
			}
		}
	)
}