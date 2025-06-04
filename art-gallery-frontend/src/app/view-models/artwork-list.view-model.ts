import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ArtworkListItem, ArtworkFilter, ArtworkType } from '../models/artwork.model';
import { ArtistListItem } from '../models/artist.model';
import { HttpClientService } from '../core/http/http-client.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ArtworkListViewModel {
  private artworksSubject = new BehaviorSubject<ArtworkListItem[]>([]);
  public artworks$ = this.artworksSubject.asObservable();

  private artistsSubject = new BehaviorSubject<ArtistListItem[]>([]);
  public artists$ = this.artistsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  private filterSubject = new BehaviorSubject<ArtworkFilter>({});
  public filter$ = this.filterSubject.asObservable();

  // Artwork types for filter dropdown
  public artworkTypes = Object.values(ArtworkType);

  constructor(
    private httpClient: HttpClientService
  ) {}

  loadArtworks(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.get<ArtworkListItem[]>('artwork', 'artworks')
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artworks => this.artworksSubject.next(artworks),
        error => this.errorSubject.next('Failed to load artworks. Please try again later.')
      );
  }

  loadArtists(): void {
    this.httpClient.get<ArtistListItem[]>('artist', 'artists')
      .subscribe(
        artists => this.artistsSubject.next(artists),
        error => this.errorSubject.next('Failed to load artists for filter. Please try again later.')
      );
  }

  searchArtworks(query: string): void {
    this.searchQuerySubject.next(query);

    if (!query.trim()) {
      this.loadArtworks();
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.get<ArtworkListItem[]>('artwork', `artworks/search?query=${query}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artworks => this.artworksSubject.next(artworks),
        error => this.errorSubject.next('Failed to search artworks. Please try again later.')
      );
  }

  filterArtworks(filter: ArtworkFilter): void {
    this.filterSubject.next(filter);
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

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

    this.httpClient.get<ArtworkListItem[]>('artwork', 'artworks/filter', params)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artworks => this.artworksSubject.next(artworks),
        error => this.errorSubject.next('Failed to filter artworks. Please try again later.')
      );
  }

  clearFilters(): void {
    this.filterSubject.next({});
    this.loadArtworks();
  }

  clearSearch(): void {
    this.searchQuerySubject.next('');
    this.loadArtworks();
  }
}
