import { db } from '#db';
import { eq } from 'drizzle-orm';
import { files } from '#db/schema';

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

		const filesInFolder = await db.select().from(files).where(eq(files.folderId, id));

		return {
			success: true,
			data: filesInFolder
		}
	}
);