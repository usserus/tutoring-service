import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIcon} from '@ng-icons/core';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.component.html',
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
