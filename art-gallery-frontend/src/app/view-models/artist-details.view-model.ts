import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../models/artist.model';
import { ArtworkListItem } from '../models/artwork.model';
import { HttpClientService } from '../core/http/http-client.service';

@Injectable()
export class ArtistDetailsViewModel {
  private artistSubject = new BehaviorSubject<Artist | null>(null);
  public artist$ = this.artistSubject.asObservable();

  private artworksSubject = new BehaviorSubject<ArtworkListItem[]>([]);
  public artworks$ = this.artworksSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  // Computed observables
  public canEdit$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService
  ) {
    // Check if user can edit artist (employee, manager, admin)
    // This would normally check with the auth service, but for now we'll simplify
    // and just return false (no editing allowed)
    this.canEdit$ = of(false);
  }

  loadArtist(id: number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    // Load artist details
    this.httpClient.get<Artist>('artist', `artists/${id}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artist => {
          this.artistSubject.next(artist);
          this.loadArtistArtworks(id);
        },
        error => this.errorSubject.next('Failed to load artist details. Please try again later.')
      );
  }

  private loadArtistArtworks(artistId: number): void {
    this.loadingSubject.next(true);

    this.httpClient.get<ArtworkListItem[]>('artwork', `artworks/artist/${artistId}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artworks => this.artworksSubject.next(artworks),
        error => this.errorSubject.next('Failed to load artist artworks. Please try again later.')
      );
  }
}
