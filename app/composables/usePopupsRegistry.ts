import CreateFolder from "~/components/popups/CreateFolder.vue";
import DeleteFile from "~/components/popups/DeleteFile.vue";

const popups =
{
	createFolder : CreateFolder,
	deleteFile   : DeleteFile
} as const;

export type PopupName = keyof typeof popups;

export function usePopupsRegistry() { return { popups }; }