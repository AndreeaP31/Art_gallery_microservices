import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Artwork, ArtworkListItem, ArtworkFilter, ArtworkType } from '../../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkCommand {
  private apiUrl = environment.artworkServiceUrl;

  constructor(private http: HttpClient) { }

  getArtworks(): Observable<ArtworkListItem[]> {
    return this.http.get<ArtworkListItem[]>(`${this.apiUrl}/artworks`);
  }

  getArtworkById(id: number): Observable<Artwork> {
    return this.http.get<Artwork>(`${this.apiUrl}/artworks/${id}`);
  }

  getArtworksByArtist(artistId: number): Observable<ArtworkListItem[]> {
    return this.http.get<ArtworkListItem[]>(`${this.apiUrl}/artworks/artist/${artistId}`);
  }

  searchArtworks(query: string): Observable<ArtworkListItem[]> {
    return this.http.get<ArtworkListItem[]>(`${this.apiUrl}/artworks/search?query=${query}`);
  }

  filterArtworks(filter: ArtworkFilter): Observable<ArtworkListItem[]> {
    let params = new HttpParams();
    
    if (filter.artistId) {
      params = params.set('artistId', filter.artistId.toString());
    }
    
    if (filter.type) {
      params = params.set('type', filter.type);
    }
    
    if (filter.minYear) {
      params = params.set('minYear', filter.minYear.toString());
    }
    
    if (filter.maxYear) {
      params = params.set('maxYear', filter.maxYear.toString());
    }
    
    if (filter.minPrice) {
      params = params.set('minPrice', filter.minPrice.toString());
    }
    
    if (filter.maxPrice) {
      params = params.set('maxPrice', filter.maxPrice.toString());
    }
    
    if (filter.sold !== undefined) {
      params = params.set('sold', filter.sold.toString());
    }
    
    return this.http.get<ArtworkListItem[]>(`${this.apiUrl}/artworks/filter`, { params });
  }

  createArtwork(artwork: Omit<Artwork, 'id'>): Observable<Artwork> {
    return this.http.post<Artwork>(`${this.apiUrl}/artworks`, artwork);
  }

  updateArtwork(id: number, artwork: Partial<Artwork>): Observable<Artwork> {
    return this.http.put<Artwork>(`${this.apiUrl}/artworks/${id}`, artwork);
  }

  deleteArtwork(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/artworks/${id}`);
  }

  sellArtwork(id: number): Observable<Artwork> {
    return this.http.post<Artwork>(`${this.apiUrl}/artworks/${id}/sell`, {});
  }

  exportArtworks(format: 'csv' | 'json' | 'xml' | 'doc'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/artworks/export/${format}`, {
      responseType: 'blob'
    });
  }
}