export const useRequest = async <T>(
	url      : string,
	options? : Record<string, any>,
) =>
{
	const baseApiUrl = useRuntimeConfig().public.BASE_URL + useRuntimeConfig().public.API_URL;
	const token      = useCookie('forgeJWT').value;

	const headers =
	{
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...options?.headers
	};

	return await $fetch<T>(baseApiUrl + url,
		{
			...options,
			headers
		}
	);
};