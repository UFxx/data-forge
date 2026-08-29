import { db } from "#db";
import { files } from "#db/schema";
import { randomUUID } from 'node:crypto'
import { writeFile, mkdir } from 'node:fs/promises';

export default defineEventHandler(async (e) =>
	{
		const parts = await readMultipartFormData(e);

		if (!parts)
			throw createError({ statusCode: 400, message: 'Нет данных' });

		const filePart = parts.find(part => part.name === 'file');

		if (!filePart || !filePart.filename)
			throw createError({ statusCode: 400, message: 'Файл не найден в запросе' });

		const fullFilename   = filePart.filename?.split('.');
		const fileExtension  = fullFilename[fullFilename?.length - 1];
		const randomFileId = randomUUID();

		const uniqueFilename = `${randomFileId}.${fileExtension}`
		const filePath = `uploads/${uniqueFilename}`;

		await mkdir('uploads', { recursive: true });
		await writeFile(filePath, filePart.data);

		const file = await db.insert(files).values(
			{
				id          : randomFileId,
				name        : filePart.filename,
				path        : filePath,
				userId      : e.context.userId,
				uniqueName  : uniqueFilename,
			}
		)

		return {
			success: true,
			message: 'Файл загружен',
			data:
			{
				filePath,
				originalName: filePart.filename
			}
		}
	}
);