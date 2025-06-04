import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Artist, ArtistListItem } from '../../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistCommand {
  private apiUrl = environment.artistServiceUrl;

  constructor(private http: HttpClient) { }

  getArtists(): Observable<ArtistListItem[]> {
    return this.http.get<ArtistListItem[]>(`${this.apiUrl}/artists`);
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`);
  }

  searchArtists(query: string): Observable<ArtistListItem[]> {
    return this.http.get<ArtistListItem[]>(`${this.apiUrl}/artists/search?query=${query}`);
  }

  createArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiUrl}/artists`, artist);
  }

  updateArtist(id: number, artist: Partial<Artist>): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/artists/${id}`, artist);
  }

  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/artists/${id}`);
  }
}