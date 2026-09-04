import type { BaseResponse } from "~/types/baseResponse";

export const useRequest = async <T>(
	url      : string,
	options? : Record<string, any>,
) =>
{
	const baseApiUrl = useRuntimeConfig().public.BASE_URL + useRuntimeConfig().public.API_URL;

	const headers = useRequestHeaders(['cookie']);

	try
	{
		const response =  await $fetch<T & BaseResponse & { data? : T }>(
			baseApiUrl + url,
			{
				headers,
				...options,
				onResponse({ response })
				{
					if (response._data?.message &&  response._data?.success)
						useToast(response._data.message, 'success');
				},
				onResponseError({ response })
				{
					useToast(response._data.message, 'error');
					console.error(response._data.message);
				}
			}
		);

		return response;
	}
	catch(err) { return; }
};