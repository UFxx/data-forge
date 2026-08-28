import user from "~/api/user";
import login from "~/api/login";
import files from "~/api/files";
import registration from "~/api/registration";

export const useApi = () =>
{
	return {
		user,
		login,
		files,
		registration
	};
}