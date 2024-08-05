export function parseDate(isoString: string): string {
    const date = new Date(isoString);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    // Format the date using the locale settings
    return date.toLocaleDateString('en-US', options);
}

export function isDateDue(dateString: string): boolean {
    const givenDate = new Date(dateString);
    const today = new Date();

    // Set the time of today's date to 00:00:00 to only compare dates, not times
    today.setHours(0, 0, 0, 0);

    const threeDaysFromToday = new Date(today);
    threeDaysFromToday.setDate(today.getDate() + 3);

    return givenDate < today || givenDate <= threeDaysFromToday;
}