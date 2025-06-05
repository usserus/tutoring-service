import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TutoringSessionForStudent} from '../../../models/tutoring-session';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {NgIcon} from '@ng-icons/core';
import {User} from '../../../models/user';
import {getFullName} from '../../../utils/get-full-name';
import {BadgeComponent} from '../../shared/badge/badge.component';
import {getTimeRange} from '../../../utils/get-time-range';
import {getFullLocation} from '../../../utils/get-full-location';
import {DatePipe} from '@angular/common';
import {Address} from '../../../models/address';
import {getStatusTranslation} from '../../../utils/status-translation';

@Component({
  selector: 'app-student-tutoring-session-list',
  imports: [NgIcon, BadgeComponent, DatePipe],
  templateUrl: './student-tutoring-session-list.component.html',
  standalone: true,
})
export class StudentTutoringSessionListComponent implements OnInit {
  tutoringSessions = signal<TutoringSessionForStudent[]>([]);
  selectedStatus = signal<string | null>(null);
  // List of available statuses for filtering
  availableStatuses = computed(() => {
    const sessions = this.tutoringSessions();
    const statuses = sessions.map((s) => s.status);
    // Use Set to remove duplicates and sort the statuses
    return Array.from(new Set(statuses)).sort();
  });
  // Computed property to filter tutoring sessions based on selected status
  filteredTutoringSessions = computed(() => {
    const status = this.selectedStatus();
    const tutoringSessions = this.tutoringSessions();

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

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    this.tutoringDataService
      .getAllTutoringSessionsForStudent()
      .subscribe((res) => this.tutoringSessions.set(res));
  }

  setStatusFilter(status: string | null) {
    this.selectedStatus.set(status);
  }

  getFullLocation(location?: Address): string {
    return getFullLocation(location);
  }

  getFullName(tutor?: User): string {
    return getFullName(tutor);
  }

  getTimeRange(startTime: Date, duration: number): string {
    return getTimeRange(startTime, duration);
  }

  getStatusTranslation(status: string): string {
    return getStatusTranslation(status, 'student');
  }
}
