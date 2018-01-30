export default function once(func) {
	let isInvoked = false;

	return function(...args) {
		if (!isInvoked)	{
			isInvoked = true;
			return func(...args);
		}
	}
}
