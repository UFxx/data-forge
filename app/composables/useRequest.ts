export const useRequest = async <T>(
	url     : string,
	options : object,
	isSsr   : boolean = false,
) =>
{
	const baseApiUrl = useRuntimeConfig().public.BASE_URL + useRuntimeConfig().public.API_URL;

	if (!isSsr)
		return await $fetch<T>(baseApiUrl + url, { ...options });
	else
		return useFetch<T>(baseApiUrl + url, { ...options });
};