import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TutoringSessionForStudent} from '../../../models/tutoring-session';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroMapPin, heroUser} from '@ng-icons/heroicons/outline';
import {User} from '../../../models/user';
import {getFullName} from '../../../utils/get-full-name';
import {BadgeComponent} from '../../shared/badge/badge.component';
import {getTimeRange} from '../../../utils/get-time-range';
import {getFullLocation} from '../../../utils/get-full-location';
import {DatePipe} from '@angular/common';
import {Address} from '../../../models/address';

@Component({
  selector: 'app-student-tutoring-session-list',
  imports: [NgIcon, BadgeComponent, DatePipe],
  templateUrl: './student-tutoring-session-list.component.html',
  providers: [provideIcons({heroMapPin, heroUser})],
  standalone: true,
})
export class StudentTutoringSessionListComponent implements OnInit {
  tutoringSessions = signal<TutoringSessionForStudent[]>([]);
  selectedStatus = signal<string | null>(null);
  availableStatuses = computed(() => {
    const sessions = this.tutoringSessions();
    const statuses = sessions.map((s) => s.status);
    return Array.from(new Set(statuses)).sort();
  });
  filteredTutoringSessions = computed(() => {
    const status = this.selectedStatus();
    const tutoringSessions = this.tutoringSessions();

    const filtered = status
      ? tutoringSessions.filter((s) => s.status === status)
      : tutoringSessions;

    return filtered.slice().sort((a, b) => {
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
}
