import { Address } from '../models/address';

export function getFullLocation(location?: Address): string {
  if (!location) {
    return '-';
  }
  return `${location.street} ${location.house_number}, ${location.postal_code} ${location.city}`;
}
