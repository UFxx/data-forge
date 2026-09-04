import { exec } from 'child_process';
import { getStatus, setStatus } from '~~/server/utils/processingStatus';

export default defineEventHandler(async (e) =>
	{
		const body   = await readBody(e);

		if (!body.args)
			throw createError(
				{
					statusCode : 400,
					message    : 'Выберите хотя-бы 1 чекбокс'
				}
			);

		if (!body.path)
			throw createError(
				{
					statusCode : 400,
					message    : 'Файл не существует'
				}
			);

		const fileKey = body.path;

		const currentStatus = getStatus(fileKey);
		if (currentStatus.status === 'processing')
			throw createError(
				{
					statusCode : 400,
					message    : 'Файл уже обрабатывается'
				}
			)

		setStatus(fileKey, { status: 'processing' });

		exec(`python scripts/main.py ${body.path} ${body.args}`, (error, stdout, stderr) =>
			{
				if (error)
				{
					console.error(`[Python Error]: ${stderr}`);
					setStatus(fileKey,
						{
							status: 'error',
							error: stderr || error?.message
						}
					);
				}
				else
				{
					console.log(`[Python]: ${stdout}`);
					setStatus(fileKey, { status  : 'done'});
				}
			}
		);

		return {
			success : true,
			message : 'Обработка начата',
		}
	}
);