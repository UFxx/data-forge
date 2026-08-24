import jwt from 'jsonwebtoken';

export default defineEventHandler((e) =>
	{
		const url = e.path;

		const publicRoutes = ['/', '/login', '/registration', '/api/login', '/api/registration'];

		if (publicRoutes.includes(url))
			return;

		const authHeader = getHeader(e, 'Authorization');

		if (!authHeader || !authHeader?.startsWith('Bearer '))
			throw createError(
				{
					statusCode: 401,
					message: 'Неавторизован'
				}
			);

		const token      = authHeader?.split(' ')[1];
		const JWT_SECRET = useRuntimeConfig().JWT_SECRET;

		if (!token)
			throw createError({ statusCode: 401, message: 'Неверный формат токена' });

		try
		{
			const decoded    = jwt.verify(token, JWT_SECRET) as { id: string };
			e.context.userId = decoded.id;
		}
		catch (err: any)
		{
			throw createError(
				{
					statusCode : 401,
					message    : 'Неавторизован'
				}
			);
		}
	}
);