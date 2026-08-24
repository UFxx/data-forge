import type { LoginForm, LoginFormResponse } from "~/types/loginForm"

export default {
	login: async (payload: LoginForm) => await useRequest<LoginFormResponse>('/login',
		{
			method: 'POST',
			body: payload
		}
	)
}