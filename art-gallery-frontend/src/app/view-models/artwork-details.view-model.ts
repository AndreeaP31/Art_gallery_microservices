import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from '@app/view-models/commands/auth.command';
import { Artwork } from '../models/artwork.model';
import { HttpClientService } from '../core/http/http-client.service';

@Injectable()
export class ArtworkDetailsViewModel {
  private artworkSubject = new BehaviorSubject<Artwork | null>(null);
  public artwork$ = this.artworkSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  // Computed observables
  public canEdit$: Observable<boolean>;
  public canSell$: Observable<boolean>;

  constructor(
    private httpClient: HttpClientService,
    private authService: AuthService
  ) {
    // Check if user can edit artwork (employee, manager, admin)
    this.canEdit$ = this.authService.isAuthenticated$
      .pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) return false;
          return this.authService.isEmployee();
        })
      );

    // Check if user can sell artwork (employee, manager)
    this.canSell$ = this.artwork$
      .pipe(
        map(artwork => {
          if (!artwork || artwork.sold) return false;
          return this.authService.isEmployee();
        })
      );
  }

  loadArtwork(id: number): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.get<Artwork>('artwork', `artworks/${id}`)
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        artwork => this.artworkSubject.next(artwork),
        error => this.errorSubject.next('Failed to load artwork details. Please try again later.')
      );
  }

  sellArtwork(): void {
    const artwork = this.artworkSubject.value;
    if (!artwork) return;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.httpClient.post<Artwork>('artwork', `artworks/${artwork.id}/sell`, {})
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        updatedArtwork => this.artworkSubject.next(updatedArtwork),
        error => this.errorSubject.next('Failed to sell artwork. Please try again later.')
      );
  }
}
