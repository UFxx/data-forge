import type { LoginForm } from "~/types/loginForm";
import type { RegistrationForm } from "~/types/registrationForm";

const { user: userApi } = useApi();

export const useUserStore = defineStore('userStore',
	() =>
	{
		const userLogin = ref<string | null>('');

		const getCurrentUser = async () =>
		{
			try
			{
				const response = await userApi.getCurrentUser();

				if (response?.login)
					setUserLogin(response.login);
				else
					navigateTo('/login');
			}
			catch(err: any) { console.error(err); }
		};

		const registration = async (data: RegistrationForm) =>
		{
			try
			{
				const response = await userApi.registration(data);

				return response
			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
		}

		const login = async (data: LoginForm) =>
		{
			try
			{
				const response = await userApi.login(data);

				return response;
			}
			catch (err: any)
			{
				useToast(err.data.message, 'error');
				console.error(err);
			}
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