import { User } from './user';
import { Address } from './address';

class TutoringSessionBase {
  constructor(
    public topic_area_id: number,
    public duration: number,
    public location?: Address,
  ) {}
}

export class TutoringSession extends TutoringSessionBase {
  constructor(
    topic_area_id: number,
    duration: number,
    public start_time: Date,
    public id: number,
    public price: number,
    public status: string,
    public student_id?: number,
    public student?: User,
    location?: Address,
  ) {
    super(topic_area_id, duration, location);
  }
}

// used for the student tutoring session list
export class TutoringSessionForStudent extends TutoringSessionBase {
  constructor(
    topic_area_id: number,
    duration: number,
    location: Address,
    public start_time: Date,
    public price: number,
    public status: string,
    public tutor: User,
    public topic_area: {
      title: string;
    },
  ) {
    super(topic_area_id, duration, location);
  }
}

// used for the student tutoring session request modal
export class TutoringSessionRequest extends TutoringSessionBase {
  constructor(
    topic_area_id: number,
    duration: number,
    location: Address,
    public id: number,
    public price: number,
    public start_time: string,
    public status: string,
  ) {
    super(topic_area_id, duration, location);
  }
}
