import { db } from '#db';
import { eq } from 'drizzle-orm';
import { users } from '#db/schema';
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt';

export default defineEventHandler(async (e) =>
	{
		try
		{
			const body = await readBody(e);

			const existingUser = await db.select({ id: users.id })
				.from(users)
				.where(eq(users.login, body.login));

			if (existingUser.length > 0)
				throw createError({
					statusCode: 400,
					message: 'Пользователь с таким логином уже зарегистрирован'
				});

				const saltRounds     = 10;
				const hashedPassword = await bcrypt.hash(body.password, saltRounds);

				const id             = randomUUID();

			await db.insert(users).values(
				{
					id       : id,
					login    : body.login,
					password : hashedPassword,
				}
			);

			return {
				success : true,
				message : 'Пользователь зарегистрирован'
			}
		}
		catch (err: any)
		{
			if (err.statusCode)
				throw err;

			console.error('Registration error:', err);

			throw createError(
				{
					statusCode: 500,
					message: 'Ошибка сервера'
				}
			)
		}
	}
);