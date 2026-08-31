import { db } from '#db';
import { eq, count } from 'drizzle-orm';
import { folders, files } from '~~/server/db/schema';

export default defineEventHandler(async (e) =>
	{
		const foldersResponse = await db.select(
			{
				id: folders.id,
				name: folders.name,
				filesCount: count(files.id)
			})
			.from(folders)
			.leftJoin(files, eq(files.folderId, folders.id))
			.where(eq(folders.userId, e.context.userId))
			.groupBy(folders.id, folders.name);


		return {
			success: true,
			data: foldersResponse
		}
	}
);