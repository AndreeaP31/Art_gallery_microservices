import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/view-models/commands/auth.command';
import { UserCredentials } from '../models/user.model';

@Injectable()
export class LoginViewModel {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(credentials: UserCredentials): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    this.authService.login(credentials)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        user => {
          // Navigate to home page after successful login
          this.router.navigate(['/']);
        },
        error => {
          // Handle different error cases
          if (error.status === 401) {
            this.errorSubject.next('Invalid username or password. Please try again.');
          } else {
            this.errorSubject.next('Login failed. Please try again later.');
          }
        }
      );
  }
}