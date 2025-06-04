import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserService } from '@app/view-models/commands/user.service';
import { AuthService } from '@app/view-models/commands/auth.command';
import { User, UserRole } from '../models/user.model';

@Injectable()
export class UserDetailsViewModel {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();
  
  private successSubject = new BehaviorSubject<string | null>(null);
  public success$ = this.successSubject.asObservable();
  
  // User roles for dropdown
  public userRoles = Object.values(UserRole);
  
  // Computed observables
  public canManageUser$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    // Only admins can manage users
    this.canManageUser$ = this.authService.isAuthenticated$
      .pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) return false;
          return this.authService.isAdmin();
        })
      );
  }

  loadUser(id: number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.successSubject.next(null);
    
    this.userService.getUserById(id)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        user => this.userSubject.next(user),
        error => this.errorSubject.next('Failed to load user details. Please try again later.')
      );
  }

  updateUser(id: number, userData: Partial<User>): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.successSubject.next(null);
    
    this.userService.updateUser(id, userData)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        updatedUser => {
          this.userSubject.next(updatedUser);
          this.successSubject.next('User updated successfully.');
        },
        error => this.errorSubject.next('Failed to update user. Please try again later.')
      );
  }

  deleteUser(id: number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.successSubject.next(null);
    
    this.userService.deleteUser(id)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        () => {
          this.userSubject.next(null);
          this.successSubject.next('User deleted successfully.');
        },
        error => this.errorSubject.next('Failed to delete user. Please try again later.')
      );
  }
}