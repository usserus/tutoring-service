import { TopicAreaRequest } from '../topic-area';

export class TopicAreaRequestFactory {
  static fromObject(obj: any): TopicAreaRequest {
    return new TopicAreaRequest(
      obj.id,
      obj.title,
      obj.slug,
      obj.tutoring_subject_id,
      obj.tutor_id,
      obj.description,
      this.mapTutoringSessions(obj.tutoringSessions ?? []),
    );
  }

  private static mapTutoringSessions(sessions: any[]): any[] {
    return sessions.map((raw) => {
      const [datePart, timePart] = raw.startTime.split('T');
      const formattedStartTime = `${datePart} ${timePart}:00`; // ChatGPT: "Y-m-d H:i:s" -> "2025-06-01 19:06:00"

      return {
        id: raw.id || null,
        student_id: raw.student || null,
        location: {
          street: raw.street,
          house_number: raw.houseNumber,
          postal_code: raw.postalCode,
          city: raw.city,
          country: raw.country,
        },
        start_time: formattedStartTime,
        duration: raw.duration,
        price: raw.price,
        status: raw.status,
      };
    });
  }
}
