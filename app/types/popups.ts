export type PopupDataMap =
{
	deleteConfirmation : DeleteConfirmationData,
	rename             : RenameData,
	chooseFolder       : ChooseFolderData
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