export const statusTranslationMap = {
  student: {
    requested: 'Angefragt',
    available: 'Verfügbar',
    booked: 'Gebucht',
    completed: 'Abgeschlossen',
  },
  tutor: {
    requested: 'Offene Anfragen',
    available: 'Angeboten',
    booked: 'Anstehend',
    completed: 'Abgeschlossen',
  },
};

// Source: ChatGpt
export function getStatusTranslation(status: string, role: string): string {
  // Cast role to keys of statusTranslationMap to satisfy TypeScript
  const roleKey = role as keyof typeof statusTranslationMap;

  // Get the map for the given role
  const roleMap = statusTranslationMap[roleKey];

  if (!roleMap) {
    return status;
  }

  // Cast status to keys of roleMap to avoid TypeScript errors
  const statusKey = status as keyof typeof roleMap;

  if (roleMap[statusKey]) {
    return roleMap[statusKey];
  }
  return status;
}
