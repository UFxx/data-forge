import { db } from '#db';
import { table } from '#db/schema';
import { randomUUID } from 'node:crypto'

export default defineEventHandler(async (e) =>
	{
		try
		{
			const body = await readBody(e);
			const id   = randomUUID();

			if (!body.text || typeof body.text !== 'string' || body.text.trim() === '')
				{
				throw createError(
					{
						statusCode: 400,
						message: 'Поле "text" обязательно и не может быть пустым'
					}
				)
			}

			await db.insert(table).values({ id: id, text: body.text });

			return {
				success : true,
				message : 'Запись добавлена',
				data    : { id: id, text: body.text }
			}
		}
		catch (err)
		{
			console.error('Ошибка вставки', err);

			throw createError(
				{
					statusCode : 500,
					message    : 'Ошибка записи'
				}
			)
		}
	}
);