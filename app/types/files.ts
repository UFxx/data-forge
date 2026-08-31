export interface FileItem
{
	id          : string,
	size        : number,
	name        : string,
	folderId?   : string | null,
	isProcessed : boolean,
};

export interface FilesResponse
{
	success : boolean,
	data    : FileItem[]
};