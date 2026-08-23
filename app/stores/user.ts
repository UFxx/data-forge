export const useUserStore = defineStore('userStore',
	() =>
	{
		const userLogin = ref<string>('');

		const setUserLogin = (login: string) => userLogin.value = login;

		return {
			userLogin,

			setUserLogin
		}
	}
);