import { db } from '#db';
import { files, folders } from '#db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (e) =>
	{
		const userFiles = await db.select(
			{
				id          : files.id,
				name        : files.name,
				size        : files.size,
				folderId    : files.folderId,
				folderName  : folders.name,
				isProcessed : files.isProcessed
			}
			).from(files)
			.leftJoin(folders, eq(files.folderId, folders.id))
			.where(eq(files.userId, e.context.userId));

		return {
			success: true,
			data: userFiles
		}
	}
);