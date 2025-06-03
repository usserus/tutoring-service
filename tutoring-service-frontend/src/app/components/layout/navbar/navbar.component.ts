import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonComponent} from '../../shared/button/button.component';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './navbar.component.html',
  standalone: true,
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getLabel(): string {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }
}
