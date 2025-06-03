import {Component, inject, OnInit, signal} from '@angular/core';
import {TutoringDataService} from '../../../services/tutoring-data.service';
import {ActivatedRoute} from '@angular/router';
import {TutoringSubjectWithTopicAreas} from '../../../models/tutoring-subject';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-topic-area-list',
  imports: [RouterLink],
  templateUrl: './topic-area-list.component.html',
  providers: [{provide: TutoringDataService, useClass: TutoringDataService}],
  standalone: true,
})
export class TopicAreaListComponent implements OnInit {
  tutoringSubject = signal<TutoringSubjectWithTopicAreas | null>(null); // undefined anstelle null?

  constructor(private route: ActivatedRoute) {
  }

  tutoringDataService = inject(TutoringDataService);

  ngOnInit(): void {
    const tutoringSubjectSlug = this.route.snapshot.params['tutoring-subject'];
    this.tutoringDataService
      .getTutoringSubjectWithTopicAreasBySlug(tutoringSubjectSlug)
      .subscribe((res) => this.tutoringSubject.set(res));
  }

  getSlug(topicArea: string): string {
    return `/lehrveranstaltungen/${this.tutoringSubject()?.slug}/${topicArea}`;
  }
}
