import { type BaseResponse } from "./baseResponse"

export interface FileItem
{
	id          : string,
	size        : number,
	name        : string,
	folderId    : string | null,
	folderName  : string | null,
	isProcessed : boolean,
};

export interface FileForProcessing
{
	id   : string,
	name : string,
	text : string,
	path : string
};

export interface FilesResponse
{
	success : boolean,
	data    : FileItem[]
};

export interface UploadFileResponse extends BaseResponse
{
	data:
	{
		fileId       : string
		filePath     : string,
		originalName : string,
	}
};

export interface GetFile extends BaseResponse
{
	data:
	{
		id   : string,
		name : string,
		path : string,
		text : string
	}
};