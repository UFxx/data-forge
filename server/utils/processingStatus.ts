export interface ProcessingStatus
{
	error?   : string,
	status   : 'idle' | 'processing' | 'done' | 'error',
	message? : string
};

const DEFAULT_MESSAGES: Record<ProcessingStatus['status'], string> =
{
	idle      : 'Ожидание обработки',
	processing: 'Идёт обработка',
	done      : 'Обработка завершена',
	error     : 'Ошибка при обработке'
};

const globalRef = globalThis as unknown as { __processingStatusMap: Map<string, ProcessingStatus> };

if (!globalRef.__processingStatusMap)
	globalRef.__processingStatusMap = new Map();

const statusMap = globalRef.__processingStatusMap;

export const getStatus = (fileKey: string): ProcessingStatus =>
{
	const status = statusMap.get(fileKey) || { status: 'idle' };

	return { ...status, message: status.message || DEFAULT_MESSAGES[status.status] };
};

export const clearStatus = (fileKey: string) => statusMap.delete(fileKey);

export const setStatus = (fileKey: string, status: ProcessingStatus) =>
{
	statusMap.set(fileKey, {
		status  : status.status,
		message : status.message || DEFAULT_MESSAGES[status.status],
		error   : status.error
	});
};