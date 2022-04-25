import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@nx-repo/ui';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Login Component initialized');

    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * On login form submit
   */
  onSubmit() {
    this.isSubmitted = true;
    // check is form valid - we are using loginFormGroup here, not loginForm
    if (this.loginFormGroup.invalid) return;
    // don't forget the .value after email and password :)
    this.authService.loginUser(this.loginForm['email'].value, this.loginForm['password'].value).subscribe({
      next: (response) => {
        this.localStorageService.setToken(response.token);
        this.router.navigate(['/dashboard']);
        console.log(response);
      },
      complete: () => {
        // this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('Error:', 'Invalid username or password', 'error');
        console.log(e.message);
      }
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
