import { db } from "#db";
import { folders } from "#db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (e) =>
	{
		const folderId = getRouterParam(e, 'id');
		if (!folderId)
			throw createError(
				{
					statusCode: 400,
					message: 'ID папки обязателен'
				}
			);

		const body = await readBody(e);
		if (!body.newName)
			throw createError(
				{
					statusCode : 400,
					message    : 'Имя обязательно'
				}
			);

		await db.update(folders).set({ name: body.newName }).where(eq(folders.id, folderId));

		return {
			success : true,
			message : 'Файл переименован'
		};
	}
);