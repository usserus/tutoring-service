import { TutoringSessionForStudent } from '../tutoring-session';
import { User } from '../user';
import { Address } from '../address';

export class TutoringSessionForStudentFactory {
  static fromObject(obj: any): TutoringSessionForStudent {
    return new TutoringSessionForStudent(
      obj.topic_area_id,
      obj.duration,
      obj.location as Address,
      typeof obj.start_time === 'string'
        ? new Date(obj.start_time)
        : obj.start_time,
      obj.price,
      obj.status,
      obj.tutor as User,
      {
        title: obj.topic_area?.title,
      },
    );
  }
}
