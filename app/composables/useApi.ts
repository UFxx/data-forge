import user from "~/api/user";
import login from "~/api/login";
import registration from "~/api/registration";

export const useApi = () =>
{
	return {
		user,
		login,
		registration
	};
}