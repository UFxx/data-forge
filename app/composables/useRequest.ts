import type { BaseResponse } from "~/types/baseResponse";

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

	const { isSsr, ...fetchOptions } = options || {};

	if (options && !options.isSsr)
	{
		const response =  await $fetch<T & BaseResponse & { data? : T }>(
			baseApiUrl + url,
			{
				...fetchOptions,
				headers
			}
		);

		if (response.success)
			useToast(response.message, 'success');
		else
		{
			useToast(response.message, 'error');
			console.error(response.message)
		}

		return response;
	}
	else
	{
		const { data } =  await useFetch<T>(baseApiUrl + url,
			{
				...fetchOptions,
				headers,
				...{ server: true }
			}
		);

		return data.value;
	}

};