import { exec } from 'child_process';

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

		exec(`python scripts/main.py ${body.path} ${body.args}`, (_, stdout) => console.log(stdout));

		return {
			success : true,
			message : 'Предобработка начата',
		}
	}
);