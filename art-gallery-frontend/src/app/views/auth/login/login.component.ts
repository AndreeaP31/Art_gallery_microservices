import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginViewModel } from '../../../view-models/login.view-model';
import { UserCredentials } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginViewModel]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewModel: LoginViewModel
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: UserCredentials = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.viewModel.login(credentials);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}