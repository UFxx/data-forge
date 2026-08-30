export default {
	create: async (name: string) => await useRequest('/folders',
		{
			method: 'POST',
			body: { name }
		}
	)
}