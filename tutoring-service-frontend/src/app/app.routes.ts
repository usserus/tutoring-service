import {Routes} from '@angular/router';
import {
  TutoringSubjectListComponent
} from './components/public-area/tutoring-subject-list/tutoring-subject-list.component';
import {TopicAreaListComponent} from './components/public-area/topic-area-list/topic-area-list.component';
import {TopicAreaDetailComponent} from './components/public-area/topic-area-detail/topic-area-detail.component';
import {LoginComponent} from './components/public-area/login/login.component';
import {MainLayoutComponent} from './components/layout/main-layout/main-layout.component';
import {EmptyLayoutComponent} from './components/layout/empty-layout/empty-layout.component';
import {
  StudentTutoringSessionListComponent
} from './components/student-area/student-tutoring-session-list/student-tutoring-session-list.component';
import {
  canNavigateToAdminGuard,
  canNavigateToUserGuard,
} from './guards/can-navigate-to.guard';
import {
  TutorTutoringSubjectListComponent
} from './components/tutor-area/tutor-tutoring-subject-list/tutor-tutoring-subject-list.component';
import {
  TutorTopicAreaListComponent
} from './components/tutor-area/tutor-topic-area-list/tutor-topic-area-list.component';
import {
  TutorTutoringSessionListComponent
} from './components/tutor-area/tutor-tutoring-session-list/tutor-tutoring-session-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: 'lehrveranstaltungen', pathMatch: 'full'},
      {path: 'lehrveranstaltungen', component: TutoringSubjectListComponent},
      {
        path: 'lehrveranstaltungen/:tutoring-subject',
        component: TopicAreaListComponent,
      },
      {
        path: 'lehrveranstaltungen/:tutoring-subject/:topic-area',
        component: TopicAreaDetailComponent,
      },
      {
        path: 'meine-termine',
        component: StudentTutoringSessionListComponent,
        canActivate: [canNavigateToUserGuard],
      },
      {
        path: 'kurse-verwalten',
        component: TutorTutoringSubjectListComponent,
        canActivate: [canNavigateToAdminGuard],
      },
      {
        path: 'kurse-verwalten/:tutoring-subject',
        component: TutorTopicAreaListComponent,
        canActivate: [canNavigateToAdminGuard],
      },
      {
        path: 'kurse-verwalten/:tutoring-subject/:topic-area',
        component: TutorTutoringSessionListComponent,
        canActivate: [canNavigateToAdminGuard],
      },
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [{path: 'login', component: LoginComponent}],
  },
];
