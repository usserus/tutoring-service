import { User } from './user';
import { TutoringSubject } from './tutoring-subject';
import { TutoringSession } from './tutoring-session';
import { Address } from './address';

class TopicAreaBase {
  constructor(
    public id: number,
    public title: string,
    public slug: string,
  ) {}
}

// used for topic areas with tutoring sessions detail view
export class TopicAreaWithTutoringSessions extends TopicAreaBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public description: string,
    public created_at?: Date | null,
    public tutoring_subject?: TutoringSubject,
    public tutor?: User,
    public tutoring_sessions?: TutoringSession[],
    public lowest_price?: number | null,
  ) {
    super(id, title, slug);
  }
}

// used for the tutor tutoring session list
// used to set the data in the topic area modal
export class TopicAreasWithTutoringSessionsForTutor extends TopicAreaBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public description: string,
    public requested_count: number,
    public turnover_completed_sessions: number,
    public turnover_requested_sessions: number,
    public tutoring_sessions: TutoringSession[],
  ) {
    super(id, title, slug);
  }
}

// used for the tutor topic area modal form (save and update)
export class TopicAreaRequest extends TopicAreaBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public tutoring_subject_id: number,
    public tutor_id: number,
    public description: string,
    public tutoring_sessions: TutoringSession[],
  ) {
    super(id, title, slug);
  }
}
