import { db } from "#db";
import { files } from "#db/schema";
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

		await db.delete(files).where(eq(files.id, id))

		return {
			success : true,
			message : 'Файл удален'
		}
	}
)