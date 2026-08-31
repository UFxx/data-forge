export const pluralize = (count: number, forms: [string, string, string]): string => {
	const absCount      = Math.abs(count);
	const lastTwoDigits = absCount % 100;
	const lastDigit     = absCount % 10;

	let formIndex: number;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19)
		formIndex = 2;
	else if (lastDigit === 1)
		formIndex = 0;
	else if (lastDigit >= 2 && lastDigit <= 4)
		formIndex = 1;
	else
		formIndex = 2;

	return `${count} ${forms[formIndex]}`;
};