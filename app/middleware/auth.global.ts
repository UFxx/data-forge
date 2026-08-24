export default defineNuxtRouteMiddleware((to) =>
	{
		const publicRoutes = ['/login', '/registration'];

		if (publicRoutes.includes(to.path))
			return;

		if (!useCookie('forgeJWT').value?.length)
			return navigateTo('/login');
	}
);