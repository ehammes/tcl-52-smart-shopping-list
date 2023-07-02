export const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Get a new JavaScript Date from how many nanoseconds have passed the epoch.
 * @param {number} nanoseconds
 */

export function nanosecondsToDate(nanoseconds) {
	return new Date(nanoseconds / 1000000);
}

/**
 * Get a new JavaScript Date from how many seconds have passed the epoch.
 * @param {number} seconds
 */
export function secondsToDate(seconds) {
	return new Date(seconds * 1000);
}

export function getDaysBetweenDates(
	newerPurchaseInMilliseconds,
	olderPurchaseInMilliseconds,
) {
	const timeBetween = newerPurchaseInMilliseconds - olderPurchaseInMilliseconds;
	const daysBetween = Math.ceil(timeBetween / ONE_DAY_IN_MILLISECONDS);

	return daysBetween;
}
