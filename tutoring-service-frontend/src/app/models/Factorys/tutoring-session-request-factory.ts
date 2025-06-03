import { TutoringSessionRequest } from '../tutoring-session';
import { formatDateToDatetimeLocal } from '../../utils/format-date-to-datetime-local';

export class TutoringSessionRequestFactory {
  static fromObject(obj: any): TutoringSessionRequest {
    const start_time = obj.start_time
      ? formatDateToDatetimeLocal(obj.start_time)
      : `${obj.date} ${obj.time}:00`; // ChatGPT: "Y-m-d H:i:s" -> "2025-06-01 19:06:00"

    const location = obj.location ?? {
      street: obj.street,
      house_number: obj.houseNumber,
      postal_code: obj.postalCode,
      city: obj.city,
      country: obj.country,
    };
    return new TutoringSessionRequest(
      obj.topic_area_id,
      obj.duration,
      location,
      obj.id,
      obj.price,
      start_time,
      obj.status,
    );
  }
}
