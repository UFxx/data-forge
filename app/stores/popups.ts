export const usePopupsStore = defineStore('popups', () => {
	const { popups }   = usePopupsRegistry();

	const popupData       = ref<any | null>(null);
	const activePopupName = ref<PopupName | null>(null);

	const activePopupComponent = computed(() => {
		return activePopupName.value
		? popups[activePopupName.value]
		: null;
	});

	const togglePopup = (popupName: PopupName, value: boolean) => {
		if (!value)
			{
			activePopupName.value = null;
			setPopupData(null);
			return;
		}

		activePopupName.value = popupName;
	};

	const closeAnyPopup = () => activePopupName.value = null;

	const setPopupData = (data: any) => popupData.value = data;

	return {
		popupData,
		activePopupName,
		activePopupComponent,

		togglePopup,
		setPopupData,
		closeAnyPopup
	}
});
