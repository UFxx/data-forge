import { db } from "#db";
import { files } from "#db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (e) => {
	const fileId = getRouterParam(e, 'id');

	if (!fileId)
		throw createError({ statusCode: 400, message: 'ID файла обязателен' });

	const body = await readBody(e);

	if (body.folderId === undefined)
		throw createError({ statusCode: 400, message: 'folderId обязателен' });

	await db.update(files)
		.set({ folderId: body.folderId })
		.where(eq(files.id, fileId));

	return {
		success: true,
		message: 'Файл перемещён',
	};
});