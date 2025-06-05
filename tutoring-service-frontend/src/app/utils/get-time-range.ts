export function getTimeRange(startTime: Date, duration: number): string {
  // Calculate the end time by adding the duration in minutes to the start time
  const end = new Date(startTime.getTime() + duration * 60 * 1000);

  // Source: ChatGPT - Formatting the time in 24-hour format
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  // toLocaleTimeString with 'de-DE' locale for 24-hour format
  const startFormatted = startTime.toLocaleTimeString('de-DE', options);
  const endFormatted = end.toLocaleTimeString('de-DE', options);

  return `${startFormatted} - ${endFormatted}`;
}
