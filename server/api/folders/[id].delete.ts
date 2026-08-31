import { db } from '#db';
import { folders } from '#db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (e) =>
	{
		const id = getRouterParam(e, 'id');

		if (!id)
			throw createError(
				{
					statusCode : 400,
					message    : 'ID обязателен'
				}
			);

		await db.delete(folders).where(eq(folders.id, id))

		return {
			success: true,
			message: 'Папка удалена'
		};
	}
);