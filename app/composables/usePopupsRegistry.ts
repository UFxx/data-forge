import Rename from "~/components/popups/Rename.vue";
import ChooseFolder from "~/components/popups/ChooseFolder/index.vue";
import CreateFolder from "~/components/popups/CreateFolder.vue";
import FolderDetail from "~/components/popups/FolderDetail/index.vue";
import DeleteFolderConfirmation from "~/components/popups/DeleteFolderConfirmation.vue";
import DeleteConfirmation from "~/components/popups/DeleteConfirmation.vue";

const popups =
{
	rename                   : Rename,
	chooseFolder             : ChooseFolder,
	createFolder             : CreateFolder,
	folderDetail             : FolderDetail,
	deleteConfirmation       : DeleteConfirmation,
	deleteFolderConfirmation : DeleteFolderConfirmation
} as const;

export type PopupName = keyof typeof popups;

export function usePopupsRegistry() { return { popups }; }