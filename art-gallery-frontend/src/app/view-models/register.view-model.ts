import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/view-models/commands/auth.command';
import { UserRegistration } from '../models/user.model';

@Injectable()
export class RegisterViewModel {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(registration: UserRegistration): void {
    // Validate passwords match
    if (registration.password !== registration.confirmPassword) {
      this.errorSubject.next('Passwords do not match.');
      return;
    }
    
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    this.authService.register(registration)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        user => {
          // Navigate to home page after successful registration
          this.router.navigate(['/']);
        },
        error => {
          // Handle different error cases
          if (error.status === 409) {
            this.errorSubject.next('Username or email already exists. Please choose another.');
          } else if (error.status === 400) {
            this.errorSubject.next('Invalid registration data. Please check your information.');
          } else {
            this.errorSubject.next('Registration failed. Please try again later.');
          }
        }
      );
  }
}