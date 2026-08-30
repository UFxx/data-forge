export interface FileItem
{
	id          : string,
	size        : number,
	name        : string,
	isProcessed : boolean,
};

export interface FilesResponse
{
	success : boolean,
	data    : FileItem[]
};