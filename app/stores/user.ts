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

		const logout = () =>
		{
			useCookie('forgeJWT').value = '';
			navigateTo('/login');
			setUserLogin('');
		}

		const setUserLogin = (login: string) => userLogin.value = login;

		return {
			userLogin,

			getCurrentUser,

			logout,
			setUserLogin
		}
	}
);