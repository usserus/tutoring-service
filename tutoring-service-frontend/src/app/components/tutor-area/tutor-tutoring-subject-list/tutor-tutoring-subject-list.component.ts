import {Component, inject, OnInit, signal} from '@angular/core';
import {TutoringSubjectForTutor} from '../../../models/tutoring-subject';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tutor-tutoring-subject-list',
  imports: [RouterLink],
  templateUrl: './tutor-tutoring-subject-list.component.html',
  standalone: true,
})
export class TutorTutoringSubjectListComponent implements OnInit {
  tutoringSubjects = signal<TutoringSubjectForTutor[]>([]);

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    this.tutoringDataService
      .getAllTutoringSubjectsForTutor()
      .subscribe((res) => this.tutoringSubjects.set(res));
  }

  getSlug(tutoringSubject: string): string {
    return `/kurse-verwalten/${tutoringSubject}`;
  }
}
