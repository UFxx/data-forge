import type { BaseResponse } from "./baseResponse";

export type PopupDataMap =
{
	rename                   : RenameData,
	chooseFolder             : ChooseFolderData,
	createFolder             : null,
	folderDetail             : FolderDetailData,
	deleteConfirmation       : DeleteConfirmationData,
	deleteFolderConfirmation : DeleteFolderConfirmationData
};

export type PopupName = keyof PopupDataMap;

// Popups Data
export interface DeleteConfirmationData
{
	id             : string,
	name           : string,
	deleteFunction : (id: string) => Promise<void>
};

export interface RenameData
{
	id             : string,
	name           : string,
	isFile?        : boolean,
	renameFunction : (id: string, newName: string) => Promise<BaseResponse | boolean | undefined >
};

export interface ChooseFolderData
{
	fileId           : string,
	currentFolderId? : string | null
};

export interface FolderDetailData
{
	id         : string,
	folderName : string,
	filesCount : number
};

export interface DeleteFolderConfirmationData
{
	id             : string,
	name           : string,
	deleteFunction : (
		id           : string,
		unlinkFiles? : boolean,
		withFiles?   : boolean
	) => Promise<BaseResponse | undefined>
}