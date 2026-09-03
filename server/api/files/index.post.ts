import { db } from "#db";
import { files } from "#db/schema";
import { randomUUID } from 'node:crypto';
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

		const getUniqueFilename = (isCopy= false) =>
		{
			if (isCopy)
				return `${randomFileId}-preprocessing.${fileExtension}`;
			else
				return `${randomFileId}.${fileExtension}`;
		}

		const filePath = `uploads/${randomFileId}/${getUniqueFilename()}`;
		const copyFilePath = `uploads/${randomFileId}/${getUniqueFilename(true)}`;

		await mkdir(`uploads/${randomFileId}`, { recursive: true });
		await writeFile(filePath, filePart.data);
		await writeFile(copyFilePath, filePart.data);

		await db.insert(files).values(
			{
				id          : randomFileId,
				name        : filePart.filename,
				size        : filePart.data.length,
				path        : copyFilePath,
				userId      : e.context.userId,
				uniqueName  : getUniqueFilename(),
			}
		)

		return {
			success: true,
			message: 'Файл загружен',
			data:
			{
				fileId       : randomFileId,
				filePath     : copyFilePath,
				originalName : filePart.filename,
			}
		}
	}
);