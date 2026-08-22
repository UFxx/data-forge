import { db } from '#db';
import { eq } from 'drizzle-orm';
import { users } from '#db/schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (e) =>
	{
		const body        = await readBody(e);
		const JWT_SECRET  = useRuntimeConfig().JWT_SECRET;
		const JWT_EXPIRES = Number(useRuntimeConfig().JWT_EXPIRES);

		const existingUser = await db.select().from(users).where(eq(users.login, body.login));

		if (!existingUser[0])
			throw createError(
					{
						statusCode : 401,
						message    : 'Неверный логин или пароль'
					}
				)

		const isCorrectPassword = await bcrypt.compare(body.password, existingUser[0].password)

		if (!isCorrectPassword)
			throw createError(
					{
						statusCode : 401,
						message    : 'Неверный логин или пароль'
					}
				)

		const token = jwt.sign(
			{ id: existingUser[0].id },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRES }
		);

		return {
			success : true,
			login   : existingUser[0].login,
			message : 'Вы успешно авторизовались',
			token,
		}
	}
)