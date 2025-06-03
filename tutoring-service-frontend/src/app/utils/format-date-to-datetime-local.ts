export function formatDateToDatetimeLocal(date: Date): string {
  // Source: ChatGPT - Format the date to match the 'datetime-local' input type
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`; // format for datetime-local
}
