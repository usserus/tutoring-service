import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ButtonComponent} from '../../shared/button/button.component';

interface Response {
  access_token: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe((res: any) => {
      this.authService.setSessionStorage((res as Response).access_token);
      this.router.navigateByUrl('/');
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
