import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, retry, throwError} from 'rxjs';
import {
  TutoringSubject,
  TutoringSubjectForTutor,
  TutoringSubjectWithTopicAreasForTutor,
  TutoringSubjectWithTopicAreas,
} from '../models/tutoring-subject';
import {
  TopicAreaWithTutoringSessions,
  TopicAreaRequest,
  TopicAreasWithTutoringSessionsForTutor,
} from '../models/topic-area';
import {
  TutoringSession,
  TutoringSessionForStudent,
  TutoringSessionRequest,
} from '../models/tutoring-session';
import {User} from '../models/user';
import {TopicAreaWithTutoringSessionsFactory} from '../models/Factorys/topic-area-with-tutoring-sessions-factory';
import {
  TopicAreasWithTutoringSessionsForTutorFactory
} from '../models/Factorys/topic-areas-with-tutoring-sessions-for-tutor-factory';
import {TutoringSessionForStudentFactory} from '../models/Factorys/tutoring-session-for-student-factory';

@Injectable({
  providedIn: 'root',
})
export class TutoringDataService {
  private api = 'http://tutoring-service.s2210456008.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAllPublicTutoringSubjects(): Observable<Array<TutoringSubject>> {
    return this.http
      .get<Array<TutoringSubject>>(`${this.api}/public/tutoring-subjects`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllTutoringSubjectsForTutor(): Observable<Array<TutoringSubjectForTutor>> {
    return this.http
      .get<
        Array<TutoringSubjectForTutor>
      >(`${this.api}/tutor/tutoring-subjects`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getTutoringSubjectWithTopicAreasBySlug(
    tutoringSubjectSlug: string,
  ): Observable<TutoringSubjectWithTopicAreas> {
    return this.http
      .get<TutoringSubjectWithTopicAreas>(
        `${this.api}/public/tutoring-subjects/${tutoringSubjectSlug}`,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getOwnTutoringSubjectWithTopicAreasBySlug(
    tutoringSubjectSlug: string,
  ): Observable<TutoringSubjectWithTopicAreasForTutor> {
    return this.http
      .get<TutoringSubjectWithTopicAreasForTutor>(
        `${this.api}/tutor/tutoring-subjects/${tutoringSubjectSlug}`,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getTopicAreaByTopicAreaSlug(
    topicAreaSlug: string,
  ): Observable<TopicAreaWithTutoringSessions> {
    return this.http
      .get<TopicAreaWithTutoringSessions>(
        `${this.api}/public/topic-areas/${topicAreaSlug}`,
      )
      .pipe(
        retry(3),
        map((data) => TopicAreaWithTutoringSessionsFactory.fromObject(data)), // https://rxjs.dev/api/operators/map
        catchError(this.errorHandler),
      );
  }

  getOwnTopicAreaWithTutoringSessionsBySlug(
    topicAreaSlug: string,
  ): Observable<TopicAreasWithTutoringSessionsForTutor> {
    return this.http
      .get<TopicAreasWithTutoringSessionsForTutor>(
        `${this.api}/tutor/topic-areas/${topicAreaSlug}`,
      )
      .pipe(
        retry(3),
        map((data) =>
          TopicAreasWithTutoringSessionsForTutorFactory.fromObject(data),
        ), // https://rxjs.dev/api/operators/map
        catchError(this.errorHandler),
      );
  }

  createTopicArea(
    topicAreaRequest: TopicAreaRequest,
  ): Observable<TopicAreaRequest> {
    return this.http
      .post<TopicAreaRequest>(`${this.api}/tutor/topic-areas`, topicAreaRequest)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateTopicArea(
    topicAreaRequest: TopicAreaRequest,
  ): Observable<TopicAreaRequest> {
    return this.http
      .put<TutoringSession>(
        `${this.api}/tutor/topic-areas/${topicAreaRequest.id}`,
        topicAreaRequest,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllTutoringSessionsForStudent(): Observable<
    Array<TutoringSessionForStudent>
  > {
    return this.http
      .get<Array<TutoringSessionForStudent>>(
        `${this.api}/student/tutoring-sessions`,
      )
      .pipe(retry(3))
      .pipe(
        retry(3),
        map((data) =>
          data.map((session) =>
            TutoringSessionForStudentFactory.fromObject(session),
          ),
        ),
        catchError(this.errorHandler),
      );
  }

  createTutoringSession(
    tutoringSessionRequest: TutoringSessionRequest,
  ): Observable<any> {
    return this.http
      .post<TutoringSessionRequest>(
        `${this.api}/student/tutoring-sessions`,
        tutoringSessionRequest,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateTutoringSessionForStudent(
    tutoringSession: TutoringSession,
  ): Observable<TutoringSession> {
    return this.http
      .put<TutoringSession>(
        `${this.api}/student/tutoring-sessions/${tutoringSession.id}`,
        tutoringSession,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  updateTutoringSessionForTutor(
    tutoringSessionRequest: TutoringSessionRequest,
  ): Observable<TutoringSessionRequest> {
    return this.http
      .put<TutoringSession>(
        `${this.api}/tutor/tutoring-sessions/${tutoringSessionRequest.id}`,
        tutoringSessionRequest,
      )
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.api}/tutor/users`)
      .pipe(retry(3))
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
