export function getFullName(user?: {
  first_name?: string;
  last_name?: string;
}): string {
  if (!user?.first_name && !user?.last_name) {
    return '-';
  }
  return `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
}
