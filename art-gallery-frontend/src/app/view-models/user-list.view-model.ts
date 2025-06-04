import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserService } from '@app/view-models/commands/user.service';
import { UserListItem, UserFilter, UserRole } from '../models/user.model';
import { AuthService } from '@app/view-models/commands/auth.command';

@Injectable()
export class UserListViewModel {
  private usersSubject = new BehaviorSubject<UserListItem[]>([]);
  public users$ = this.usersSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  private filterSubject = new BehaviorSubject<UserFilter>({});
  public filter$ = this.filterSubject.asObservable();

  // User roles for filter dropdown
  public userRoles = Object.values(UserRole);

  // Computed observables
  public canManageUsers$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    // Only admins can manage users
    this.canManageUsers$ = this.authService.isAuthenticated$
      .pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) return false;
          return this.authService.isAdmin();
        })
      );
  }

  loadUsers(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.userService.getUsers()
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        users => this.usersSubject.next(users),
        error => this.errorSubject.next('Failed to load users. Please try again later.')
      );
  }

  filterUsers(filter: UserFilter): void {
    this.filterSubject.next(filter);
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.userService.filterUsers(filter)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        users => this.usersSubject.next(users),
        error => this.errorSubject.next('Failed to filter users. Please try again later.')
      );
  }

  clearFilters(): void {
    this.filterSubject.next({});
    this.loadUsers();
  }

  exportUsers(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.userService.exportUsers('csv')
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        blob => {
          // Create a download link and trigger download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        error => this.errorSubject.next('Failed to export users. Please try again later.')
      );
  }
}
