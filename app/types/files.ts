export interface FileItem
{
	id          : string,
	name        : string,
	isProcessed : boolean,
};

export interface FilesResponse
{
	success: boolean,
	data: FileItem[]
};