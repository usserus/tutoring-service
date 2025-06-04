import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {ButtonComponent} from '../../shared/button/button.component';
import {ToastrService} from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe((res: any) => {
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl('/');
      }, () => {
        this.toastr.error('Inkorrekte Login Daten!', 'Tutor-Ring');
      }
    );
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
