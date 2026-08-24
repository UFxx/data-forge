import type { RegistrationForm } from "~/types/rgistrationForm"
import type { BaseResponse } from "~/types/baseResponse"

export default {
	registration: async (payload: RegistrationForm) => await useRequest<BaseResponse>('/registration',
		{
			method: 'POST',
			body: payload
		}
	)
}