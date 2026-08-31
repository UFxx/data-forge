import type { PopupDataMap, PopupName } from "~/types/popups";

export const usePopupsStore = defineStore('popups', () => {
	const { popups }   = usePopupsRegistry();

	const popupData       = ref<PopupDataMap[PopupName] | null>(null);
	const activePopupName = ref<PopupName | null>(null);

	const activePopupComponent = computed(() => {
		return activePopupName.value
		? popups[activePopupName.value]
		: null;
	});

	const togglePopup = <T extends PopupName>(popupName: T, value: boolean) => {
		if (!value)
		{
			activePopupName.value = null;
			setPopupData(null);
			return;
		}

		activePopupName.value = popupName;
	};

	const closeAnyPopup = () => activePopupName.value = null;

	const setPopupData = <T extends PopupName> (data: PopupDataMap[T] | null) => popupData.value = data;

	return {
		popupData,
		activePopupName,
		activePopupComponent,

		togglePopup,
		setPopupData,
		closeAnyPopup
	}
});
