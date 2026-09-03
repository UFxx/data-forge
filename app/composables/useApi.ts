import user from "~/api/user";
import files from "~/api/files";
import folders from "~/api/folders";
import preprocessing from "~/api/preprocessing";

export const useApi = () =>
{
	return {
		user,
		files,
		folders,
		preprocessing
	};
}