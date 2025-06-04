import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterViewModel } from '../../../view-models/register.view-model';
import { UserRegistration } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterViewModel]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewModel: RegisterViewModel
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Check if passwords match
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.error = 'Passwords do not match';
      return;
    }

    const registration: UserRegistration = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value
    };

    this.viewModel.register(registration);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}