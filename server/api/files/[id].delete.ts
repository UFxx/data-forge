import { db } from "#db";
import { files } from "#db/schema";
import fs from 'node:fs';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (e) =>
	{
		const id = getRouterParam(e, 'id');

		if (!id)
			throw createError(
				{
					statusCode: 400,
					message: 'Параметр ID является обязательным'
				}
			);

		const file = db.delete(files).where(eq(files.id, id)).returning({ path: files.path }).get();

		if (!file)
			throw createError(
				{
					statusCode: 400,
					message: 'Параметр ID является обязательным'
				}
			);

		if (file?.path)
		{
			const folderPath = file.path.split('/').slice(0, 2).join('/');

			fs.rm(folderPath,
				{ recursive: true },
				(err) =>
				{
					if (err)
						throw createError(
							{
								statusCode : 500,
								message    : 'Не удалось удалить папку'
							}
						)
				}
			);
		}

		return {
			success : true,
			message : 'Файл удален'
		};
	}
)