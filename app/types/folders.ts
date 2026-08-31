import { type BaseResponse } from "~/types/baseResponse";

export interface Folder
{
	id         : string,
	name       : string,
	filesCount : number
};

export interface FoldersResponse
{
	success : boolean,
	data    : Folder[]
};

export interface CreateFolderResponse extends BaseResponse
{
	data: { folderId: string };
};