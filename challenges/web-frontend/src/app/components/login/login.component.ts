import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, finalize, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', Validators.required);
  loginForm = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl
  });
  hide = true;
  loading = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.errorMessage = '';

    this.authService
      .login(this.emailCtrl.value.trim(), this.passwordCtrl.value.trim())
      .pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            !!error.error && !!error.error.message ? error.error.message : '';
          return of(false);
        })
      )
      .subscribe((response: LoginDTO) => {
        if (!response) return;

        if (response.type === 0) {
          this.errorMessage = 'Non-buyers are not allowed to login.';
          return;
        }

        this.sessionService.setSession(response);
        this.authService.isLoggedIn = true;
        this.router.navigate(['home']);
      });
  }
}
