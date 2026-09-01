export type PopupDataMap =
{
	rename             : RenameData,
	chooseFolder       : ChooseFolderData,
	createFolder       : null,
	folderDetail       : FolderDetail,
	deleteConfirmation : DeleteConfirmationData,
};

export type PopupName = keyof PopupDataMap;

// Popups Data
export interface DeleteConfirmationData
{
	id             : string,
	name           : string,
	deleteFunction : Function
};

export interface RenameData
{
	id             : string,
	name           : string,
	isFile?        : boolean,
	renameFunction : Function
};

export interface ChooseFolderData
{
	fileId           : string,
	currentFolderId? : string | null
};

export interface FolderDetail
{
	id         : string,
	folderName : string,
	filesCount : number
};