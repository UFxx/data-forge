import user from "~/api/user";
import login from "~/api/login";
import files from "~/api/files";
import folders from "~/api/folders";
import registration from "~/api/registration";

export const useApi = () =>
{
	return {
		user,
		login,
		files,
		folders,
		registration
	};
}