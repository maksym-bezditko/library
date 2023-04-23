export function sortListByDateDescending(a, b) {
	return +b.timestamp - +a.timestamp;
}
export function sortListByDateAscending(a, b) {
	return +a.timestamp - +b.timestamp;
}