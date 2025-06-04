import {Component, OnInit, signal, inject} from '@angular/core';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {TopicAreaWithTutoringSessions} from '../../../models/topic-area';
import {ActivatedRoute} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {getFullName} from '../../../utils/get-full-name';
import {User} from '../../../models/user';
import {ButtonComponent} from '../../shared/button/button.component';
import {
  TutoringSessionRequestModalFormComponent
} from '../tutoring-session-request-modal-form/tutoring-session-request-modal-form.component';
import {AuthenticationService} from '../../../services/authentication.service';
import {TutoringSession} from '../../../models/tutoring-session';
import {DatePipe} from '@angular/common';
import {getTimeRange} from '../../../utils/get-time-range';
import {getFullLocation} from '../../../utils/get-full-location';
import {Address} from '../../../models/address';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-topic-area-detail',
  imports: [
    NgIcon,
    ButtonComponent,
    TutoringSessionRequestModalFormComponent,
    DatePipe,
  ],
  templateUrl: './topic-area-detail.component.html',
  providers: [
    {provide: TutoringDataService, useClass: TutoringDataService}],
  standalone: true,
})
export class TopicAreaDetailComponent implements OnInit {
  topicArea = signal<TopicAreaWithTutoringSessions | null>(null);
  isModalOpen = signal(false);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    const topicAreaSlug = this.route.snapshot.params['topic-area'];
    this.tutoringDataService
      .getTopicAreaByTopicAreaSlug(topicAreaSlug)
      .subscribe((res) => this.topicArea.set(res));
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getFullName(tutor?: User): string {
    return getFullName(tutor);
  }

  getTimeRange(startTime: Date, duration: number): string {
    return getTimeRange(startTime, duration);
  }

  getFullLocation(location?: Address): string {
    return getFullLocation(location);
  }

  requestTutoringSession(tutoringSession: TutoringSession) {
    const confirmed = window.confirm(
      'Möchtest du diese Nachhilfestunde wirklich buchen?',
    );
    if (!confirmed) return;

    tutoringSession.status = 'requested';
    tutoringSession.student_id = this.authService.getCurrentUserId();
    this.tutoringDataService
      .updateTutoringSessionForStudent(tutoringSession)
      .subscribe(() => {
        const topicArea = this.topicArea();
        if (!topicArea?.tutoring_sessions) return;
        this.toastr.success('Nachhilfestunde erfolgreich angefragt!', 'Tutor-Ring', {
          progressBar: true,
        });

        const updatedTutoringSessions = topicArea.tutoring_sessions.filter(
          (session) => session.id !== tutoringSession.id,
        );

        this.topicArea.set({
          ...topicArea,
          tutoring_sessions: updatedTutoringSessions,
        });
      });
  }
}
