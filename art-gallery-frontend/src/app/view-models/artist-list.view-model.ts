import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ArtistListItem } from '../models/artist.model';
import { HttpClientService } from '../core/http/http-client.service';

@Injectable()
export class ArtistListViewModel {
  private artistsSubject = new BehaviorSubject<ArtistListItem[]>([]);
  public artists$ = this.artistsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  constructor(private httpClient: HttpClientService) {}

  loadArtists(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.get<ArtistListItem[]>('artist', 'artists')
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artists => this.artistsSubject.next(artists),
        error => this.errorSubject.next('Failed to load artists. Please try again later.')
      );
  }

  searchArtists(query: string): void {
    this.searchQuerySubject.next(query);

    if (!query.trim()) {
      this.loadArtists();
      return;
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.get<ArtistListItem[]>('artist', `artists/search?query=${query}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artists => this.artistsSubject.next(artists),
        error => this.errorSubject.next('Failed to search artists. Please try again later.')
      );
  }

  clearSearch(): void {
    this.searchQuerySubject.next('');
    this.loadArtists();
  }
}
