import { getStatus } from "~~/server/utils/processingStatus";

export default defineEventHandler((e) =>
	{
		const query    = getQuery(e);
		const filePath = query.path as string;

		if (!filePath)
			throw createError(
				{
					statusCode : 400,
					message    : 'Не указан путь к файлу'
				}
			);

		const status = getStatus(filePath);

		if (status.error)
			throw createError(
				{
					statusCode : 500,
					message    : 'Произошла ошибка при обработке файла, повторите позже'
				}
			)


		return {
			success : status.status === 'done',
			message : status.message
		}
	}
);