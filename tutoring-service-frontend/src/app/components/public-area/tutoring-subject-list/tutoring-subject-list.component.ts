import {Component, inject, signal, OnInit, computed} from '@angular/core';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {TutoringSubject} from '../../../models/tutoring-subject';
import {RouterLink} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {getFullName} from '../../../utils/get-full-name';
import {User} from '../../../models/user';

@Component({
  selector: 'app-tutoring-subject-list',
  imports: [RouterLink, NgIcon],
  templateUrl: './tutoring-subject-list.component.html',
  standalone: true,
})
export class TutoringSubjectListComponent implements OnInit {
  tutoringSubjects = signal<TutoringSubject[]>([]);

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    this.tutoringDataService
      .getAllPublicTutoringSubjects()
      .subscribe((res) => this.tutoringSubjects.set(res));
  }

  getSlug(tutoringSubject: string): string {
    return `/lehrveranstaltungen/${tutoringSubject}`;
  }

  getFullName(tutor?: User): string {
    return getFullName(tutor);
  }
}
