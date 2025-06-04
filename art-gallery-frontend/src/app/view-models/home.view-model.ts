import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArtworkListItem } from '../models/artwork.model';
import { ArtistListItem } from '../models/artist.model';
import { HttpClientService } from '../core/http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class HomeViewModel {
  private featuredArtworksSubject = new BehaviorSubject<ArtworkListItem[]>([]);
  private featuredArtistsSubject = new BehaviorSubject<ArtistListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public featuredArtworks$: Observable<ArtworkListItem[]> = this.featuredArtworksSubject.asObservable();
  public featuredArtists$: Observable<ArtistListItem[]> = this.featuredArtistsSubject.asObservable();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor(
    private httpClient: HttpClientService
  ) { }

  /**
   * Load featured content for the home page
   */
  loadFeaturedContent(): void {
    this.loadingSubject.next(true);

    // Load featured artworks
    this.httpClient.get<ArtworkListItem[]>('artwork', 'artworks')
      .subscribe(
        artworks => {
          // Get the most recent artworks (up to 6)
          const featuredArtworks = artworks
            .sort((a, b) => b.creationYear - a.creationYear)
            .slice(0, 6);
          this.featuredArtworksSubject.next(featuredArtworks);
          this.loadingSubject.next(false);
        },
        error => {
          this.errorSubject.next('Failed to load featured artworks');
          this.loadingSubject.next(false);
        }
      );

    // Load featured artists
    this.httpClient.get<ArtistListItem[]>('artist', 'artists')
      .subscribe(
        artists => {
          // Get a random selection of artists (up to 4)
          const featuredArtists = this.getRandomItems(artists, 4);
          this.featuredArtistsSubject.next(featuredArtists);
        },
        error => {
          this.errorSubject.next('Failed to load featured artists');
        }
      );
  }

  /**
   * Get random items from an array
   * @param items The array of items
   * @param count The number of items to return
   * @returns A random selection of items
   */
  private getRandomItems<T>(items: T[], count: number): T[] {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
