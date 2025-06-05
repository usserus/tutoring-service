import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {TopicAreasWithTutoringSessionsForTutor} from '../../../models/topic-area';
import {ButtonComponent} from '../../shared/button/button.component';
import {getFullName} from '../../../utils/get-full-name';
import {getTimeRange} from '../../../utils/get-time-range';
import {getFullLocation} from '../../../utils/get-full-location';
import {BadgeComponent} from '../../shared/badge/badge.component';
import {TutoringSession} from '../../../models/tutoring-session';
import {DatePipe} from '@angular/common';
import {User} from '../../../models/user';
import {Address} from '../../../models/address';
import {TutoringSessionRequestFactory} from '../../../models/Factorys/tutoring-session-request-factory';
import {getStatusTranslation} from '../../../utils/status-translation';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tutor-tutoring-session-list',
  imports: [ButtonComponent, BadgeComponent, DatePipe],
  templateUrl: './tutor-tutoring-session-list.component.html',
  standalone: true,
})
export class TutorTutoringSessionListComponent implements OnInit {
  topicArea = signal<TopicAreasWithTutoringSessionsForTutor | null>(null);
  selectedStatus = signal<string | null>(null);
  // List of available statuses for filtering
  availableStatuses = computed(() => {
    const sessions = this.topicArea()?.tutoring_sessions || [];
    const statuses = sessions.map((s) => s.status);
    // Use Set to remove duplicates and sort the statuses
    return Array.from(new Set(statuses)).sort();
  });
  // Computed property to filter tutoring sessions based on selected status
  filteredTutoringSessions = computed(() => {
    const status = this.selectedStatus();
    const tutoringSessions = this.topicArea()?.tutoring_sessions || [];

    const filtered = status
      ? tutoringSessions.filter((s) => s.status === status)
      : tutoringSessions;

    // Sort the filtered sessions by start time in descending order
    return filtered.sort((a, b) => {
      return (
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
      );
    });
  });

  constructor(private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    const topicAreaSlug = this.route.snapshot.params['topic-area'];
    this.tutoringDataService
      .getOwnTopicAreaWithTutoringSessionsBySlug(topicAreaSlug)
      .subscribe((res) => {
        this.topicArea.set(res);
      });
  }

  setStatusFilter(status: string | null) {
    this.selectedStatus.set(status);
  }

  updateTutoringSession(tutoringSession: TutoringSession) {
    const confirmed = window.confirm(
      'Möchtest du diese Terminanfrage wirklich annehmen?',
    );
    if (!confirmed) return;

    tutoringSession.status = 'booked';
    const newTutoringSessionRequest =
      TutoringSessionRequestFactory.fromObject(tutoringSession);

    this.tutoringDataService
      .updateTutoringSessionForTutor(newTutoringSessionRequest)
      .subscribe(() => {
        this.toastr.success(
          'Anfrage wurde erfolgreich angenommen!',
          'Tutor-Ring', {
            progressBar: true,
          }
        );
      });
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

  getStatusTranslation(status: string): string {
    return getStatusTranslation(status, 'tutor');
  }
}
