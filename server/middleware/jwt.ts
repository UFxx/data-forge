import jwt from 'jsonwebtoken';

export default defineEventHandler((e) =>
	{
		const url = e.path;
		const publicRoutes = ['/', '/login', '/registration', '/api/login', '/api/registration'];

		if (publicRoutes.includes(url)) return;

		let token: string | undefined;

		const authHeader = getHeader(e, 'Authorization');

		if (authHeader && authHeader.startsWith('Bearer '))
			token = authHeader.split(' ')[1];

		if (!token)
			token = getCookie(e, 'forgeJWT');

		if (!token)
			throw createError({ statusCode: 401, message: 'Токен не найден' });

		const JWT_SECRET = useRuntimeConfig().JWT_SECRET?.trim();

		try
		{
			const decoded    = jwt.verify(token, JWT_SECRET) as { id: string };
			e.context.userId = decoded.id;
		}
		catch (err: any)
		{
			throw createError({
				statusCode : 401,
				message    : 'Неавторизован (Неверная подпись)'
			});
		}
	}
);