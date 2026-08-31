import { db } from '#db';
import { randomUUID } from 'node:crypto';
import { folders } from '~~/server/db/schema';

export default defineEventHandler(async (e) =>
	{
		const body = await readBody(e);

		if (!body.name)
			throw createError(
				{
					statusCode : 400,
					message    : 'Имя обязательно'
				}
			);

		const id = randomUUID();

		await db.insert(folders).values(
			{
				id,
				name: body.name,
				userId: e.context.userId
			}
		);

		return {
			success : true,
			message : 'Папка создана',
			data: { folderId: id }
		}
	}
);