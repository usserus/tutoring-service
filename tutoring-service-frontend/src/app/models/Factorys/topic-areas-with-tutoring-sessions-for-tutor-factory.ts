import { TopicAreasWithTutoringSessionsForTutor } from '../topic-area';
import { TutoringSessionFactory } from './tutoring-session-factory';

export class TopicAreasWithTutoringSessionsForTutorFactory {
  static fromObject(obj: any): TopicAreasWithTutoringSessionsForTutor {
    return new TopicAreasWithTutoringSessionsForTutor(
      obj.id,
      obj.title,
      obj.slug,
      obj.description,
      obj.requested_count,
      obj.turnover_completed_sessions,
      obj.turnover_requested_sessions,
      obj.tutoring_sessions?.map((ts: any) =>
        TutoringSessionFactory.fromObject(ts),
      ) ?? [],
    );
  }
}
