import type { LoginForm } from "~/types/loginForm";
import type { RegistrationForm } from "~/types/registrationForm";

const { user: userApi } = useApi();

export const useUserStore = defineStore('userStore',
	() =>
	{
		const userLogin = ref<string | null>('');

		const getCurrentUser = async () =>
		{
			const response = await userApi.getCurrentUser();

			if (response?.login)
				setUserLogin(response.login);
			else
				navigateTo('/login');
		};

		const registration = async (data: RegistrationForm) =>
		{
			const response = await userApi.registration(data);
			return response;
		}

		const login = async (data: LoginForm) =>
		{
				const response = await userApi.login(data);
				return response;
		};

		const logout = () =>
		{
			useCookie('forgeJWT').value = '';
			navigateTo('/login');
			setUserLogin('');
		};

		const setUserLogin = (login: string) => userLogin.value = login;

		return {
			userLogin,

			login,
			logout,
			registration,
			setUserLogin,

			getCurrentUser
		}
	}
);