import type { ToastType } from "~/types/toasts"

export default (name: string, type: ToastType = 'success') =>
{
	const toastsStore = useToastsStore();

	toastsStore.addToast(type, name);
}