import { db } from '#db';
import { files, folders } from '#db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (e) =>
	{
		const id          = getRouterParam(e, 'id');
		const withFiles   = getQuery(e).withFiles;
		const unlinkFiles = getQuery(e).unlinkFiles;

		if (!id)
			throw createError(
				{
					statusCode : 400,
					message    : 'ID обязателен'
				}
			);

		const existingFolder = db.select().from(folders).where(eq(folders.id, id)).get();

		if (!existingFolder)
			throw createError(
				{
					statusCode: 400,
					message: 'Такой папки не существует'
				}
			);

		if (withFiles === 'true')
			await db.delete(files).where(eq(files.folderId, id));

		if (unlinkFiles === 'true')
			await db.update(files).set({ folderId: null }).where(eq(files.folderId, id));

		await db.delete(folders).where(eq(folders.id, id));

		return {
			success: true,
			message: 'Папка удалена'
		};
	}
);