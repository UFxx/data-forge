import type { BaseResponse } from "~/types/baseResponse";
import type { UserResponse } from "~/types/user";
import type { RegistrationForm } from "~/types/rgistrationForm";
import type { LoginForm, LoginFormResponse } from "~/types/loginForm";

export default {
	getCurrentUser: async () => useRequest<UserResponse>('/user'),

	registration: async (payload: RegistrationForm) => await useRequest<BaseResponse>('/registration',
		{
			method: 'POST',
			body: payload
		}
	),

	login: async (payload: LoginForm) => await useRequest<LoginFormResponse>('/login',
		{
			method: 'POST',
			body: payload
		}
	)
}