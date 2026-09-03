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

		if (file?.path)
			fs.unlinkSync(file.path)

		return {
			success : true,
			message : 'Файл удален'
		}
	}
)