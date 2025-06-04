import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiUrls = {
    artist: environment.artistServiceUrl,
    artwork: environment.artworkServiceUrl,
    user: environment.userServiceUrl
  };

  constructor(private http: HttpClient) { }


  private getServiceUrl(service: 'artist' | 'artwork' | 'user'): string {
    return this.apiUrls[service];
  }


  get<T>(service: 'artist' | 'artwork' | 'user', endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.getServiceUrl(service)}/${endpoint}`;
    return this.http.get<T>(url, { params });
  }


  post<T>(service: 'artist' | 'artwork' | 'user', endpoint: string, body: any): Observable<T> {
    const url = `${this.getServiceUrl(service)}/${endpoint}`;
    return this.http.post<T>(url, body);
  }


  put<T>(service: 'artist' | 'artwork' | 'user', endpoint: string, body: any): Observable<T> {
    const url = `${this.getServiceUrl(service)}/${endpoint}`;
    return this.http.put<T>(url, body);
  }


  delete<T>(service: 'artist' | 'artwork' | 'user', endpoint: string): Observable<T> {
    const url = `${this.getServiceUrl(service)}/${endpoint}`;
    return this.http.delete<T>(url);
  }
}