import { TutoringSession } from '../tutoring-session';

export class TutoringSessionFactory {
  static fromObject(obj: any): TutoringSession {
    return new TutoringSession(
      obj.topic_area_id,
      obj.duration,
      typeof obj.start_time === 'string'
        ? new Date(obj.start_time)
        : obj.start_time,
      obj.id,
      obj.price,
      obj.status,
      obj.student_id,
      obj.student,
      obj.location,
    );
  }
}
