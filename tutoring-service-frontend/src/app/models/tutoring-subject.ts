import {User} from './user';

class TutoringSubjectBase {
  constructor(
    public id: number,
    public title: string,
    public slug: string,
  ) {
  }
}

// used for the public tutoring subject list
export class TutoringSubject extends TutoringSubjectBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public description: string,
    public topic_areas_count: number,
    public tutor: User,
  ) {
    super(id, title, slug);
  }
}

// used for the public topic area list
export class TutoringSubjectWithTopicAreas extends TutoringSubjectBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public topic_areas: {
      title: string;
      description: string;
      slug: string;
      tutoring_subject_id: number;
      available_tutoring_sessions_count: number;
      lowest_price: number;
    }[],
  ) {
    super(id, title, slug);
  }
}

// used for the tutor tutoring subject list
export class TutoringSubjectForTutor extends TutoringSubjectBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public topic_areas_count: number,
  ) {
    super(id, title, slug);
  }
}

// used for the tutor topic area list
export class TutoringSubjectWithTopicAreasForTutor extends TutoringSubjectBase {
  constructor(
    id: number,
    title: string,
    slug: string,
    public topic_areas: {
      id: number;
      title: string;
      description: string;
      slug: string;
      tutoring_subject_id: number;
      requested_tutoring_sessions_count: number;
      available_tutoring_sessions_count: number;
      booked_tutoring_sessions_count: number;
      pending_tutoring_sessions_count: number;
      completed_tutoring_sessions_count: number;
    }[],
  ) {
    super(id, title, slug);
  }
}
