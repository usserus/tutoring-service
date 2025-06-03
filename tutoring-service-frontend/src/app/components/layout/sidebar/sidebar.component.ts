import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  heroClipboardDocumentList,
  heroCalendarDays,
  heroAdjustmentsHorizontal,
} from '@ng-icons/heroicons/outline';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.component.html',
  providers: [
    provideIcons({
      heroClipboardDocumentList,
      heroCalendarDays,
      heroAdjustmentsHorizontal,
    }),
  ],
  standalone: true,
})
export class SidebarComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isTutor(): boolean {
    return this.authService.isTutor();
  }
}
