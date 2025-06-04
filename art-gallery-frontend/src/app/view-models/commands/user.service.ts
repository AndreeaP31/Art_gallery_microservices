import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User, UserListItem, UserFilter, UserRole } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.userServiceUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserListItem[]> {
    return this.http.get<UserListItem[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  filterUsers(filter: UserFilter): Observable<UserListItem[]> {
    let params = new HttpParams();
    
    if (filter.role) {
      params = params.set('role', filter.role);
    }
    
    if (filter.enabled !== undefined) {
      params = params.set('enabled', filter.enabled.toString());
    }
    
    if (filter.galleryId) {
      params = params.set('galleryId', filter.galleryId.toString());
    }
    
    return this.http.get<UserListItem[]>(`${this.apiUrl}/users/filter`, { params });
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  exportUsers(format: 'csv'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/users/export/${format}`, {
      responseType: 'blob'
    });
  }
}