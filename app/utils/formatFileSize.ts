export default (bytes: number): string => {
	if (bytes < 1024) return `${bytes} Б`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} КБ`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} МБ`;
};