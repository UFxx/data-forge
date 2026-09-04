import { db } from '#db';
import { files } from '#db/schema';
import { open } from 'node:fs/promises';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (e) =>
	{
		const id = getRouterParam(e, 'id');

		if (!id)
			throw createError(
			{
				statusCode : 400,
				message    : 'ID обязателен'
			}
		);

		const file = db.select(
			{
				id: files.id,
				name: files.name,
				path: files.path,
			}
		).from(files).where(eq(files.id, id)).get();

		if (!file)
			throw createError(
			{
				statusCode : 400,
				message    : 'Файла с таким ID не существует'
			}
		);

		let fileText;

		if (file?.path)
		{
			const buffer = Buffer.alloc(1024 * 1024);
			const handle = await open(file.path, 'r');
			await handle.read(buffer, 0, 1024 * 1024, 0);
			await handle.close();

			fileText = buffer.toString('utf8');
		}
		else
			throw createError(
			{
				statusCode : 500,
				message    : 'Не удалось прочитать файл'
			}
		);

		return {
			success : true,
			data    :
			{
				...file,
				text: fileText
			}
		}
	}
);