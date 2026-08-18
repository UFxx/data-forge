import { db } from "#db/index";
import { eq } from "drizzle-orm";
import { table } from "#db/schema";

export default defineEventHandler(async (e) =>
	{
		const param = getQuery(e) as { text: string };

		try
		{
			if (param.text)
			{
				const results = await db.select().from(table).where(eq(table.text, param.text));

				return {
					success: true,
					data: results
				}
			}
			else
			{
				const results = await db.select().from(table);

				return {
					success: true,
					data: results
				}
			}
		}
		catch (err)
		{
			 if (err instanceof Error) {
				console.error(err.message)
				throw createError({
				statusCode: 500,
				message: err.message
				})
			}

			throw createError(
				{
					statusCode: 500,
					message: "Неизвестная ошибка"
				}
			)
		}
	}
);