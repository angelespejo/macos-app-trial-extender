export class Time {

	getCurrent( ) {

		const now                   = new Date()
		const timezoneOffsetMinutes = now.getTimezoneOffset()
		const timezoneOffsetHours   = timezoneOffsetMinutes / 60

		return {
			year     : now.getFullYear(),
			month    : now.getMonth() + 1, // Months are zero-based (0-11), so add 1
			day      : now.getDate(),
			hour     : now.getHours(),
			minute   : now.getMinutes(),
			second   : now.getSeconds(),
			fullHour : now.toLocaleTimeString( [], {
				hour   : '2-digit',
				minute : '2-digit',
				second : '2-digit',
			} ),
			fullDay : now.toLocaleDateString( undefined, {
				year  : 'numeric',
				month : 'numeric',
				day   : 'numeric',
			} ),
			now,
			TZ : {
				mins  : timezoneOffsetMinutes,
				hours : timezoneOffsetHours,
			},
		}

	}

}
