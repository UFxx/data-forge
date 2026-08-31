import user from "~/api/user";
import files from "~/api/files";
import folders from "~/api/folders";

export const useApi = () =>
{
	return {
		user,
		files,
		folders
	};
}