import {Component, inject, OnInit, signal} from '@angular/core';
import {TutoringSubjectWithTopicAreasForTutor} from '../../../models/tutoring-subject';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {ButtonComponent} from '../../shared/button/button.component';
import {BadgeComponent} from '../../shared/badge/badge.component';
import {TutorTopicAreaModalFormComponent} from '../tutor-topic-area-modal-form/tutor-topic-area-modal-form.component';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-tutor-topic-area-list',
  imports: [
    RouterLink,
    ButtonComponent,
    BadgeComponent,
    TutorTopicAreaModalFormComponent,
    NgIcon,
  ],
  templateUrl: './tutor-topic-area-list.component.html',
  standalone: true,
})
export class TutorTopicAreaListComponent implements OnInit {
  tutoringSubject = signal<TutoringSubjectWithTopicAreasForTutor | null>(null); // undefined anstelle null?
  isModalOpen = signal(false);
  editedTopicAreaSlug = signal<string | null>(null);
  tutoringSubjectId = signal<number>(-1);

  constructor(private route: ActivatedRoute) {
  }

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    const tutoringSubjectSlug = this.route.snapshot.params['tutoring-subject'];
    this.tutoringDataService
      .getOwnTutoringSubjectWithTopicAreasBySlug(tutoringSubjectSlug)
      .subscribe((res) => this.tutoringSubject.set(res));
  }

  getSlug(topicArea: string): string {
    return `/kurse-verwalten/${this.tutoringSubject()?.slug}/${topicArea}`;
  }

  openModal(topicAreaSlug?: string | null, tutoringSubjectId?: number) {
    this.editedTopicAreaSlug.set(topicAreaSlug ?? null);
    this.tutoringSubjectId.set(tutoringSubjectId ?? -1);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
