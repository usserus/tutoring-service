import { TopicAreaWithTutoringSessions } from '../topic-area';
import { TutoringSessionFactory } from './tutoring-session-factory';

export class TopicAreaWithTutoringSessionsFactory {
  static fromObject(obj: any): TopicAreaWithTutoringSessions {
    return new TopicAreaWithTutoringSessions(
      obj.id,
      obj.title,
      obj.slug,
      obj.description,
      typeof obj.created_at === 'string'
        ? new Date(obj.created_at)
        : obj.created_at,
      obj.tutoring_subject,
      obj.tutor,
      obj.tutoring_sessions?.map((ts: any) =>
        TutoringSessionFactory.fromObject(ts),
      ) ?? [],
      obj.lowest_price,
    );
  }
}
