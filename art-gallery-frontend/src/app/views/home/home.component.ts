import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArtworkListItem } from '../../models/artwork.model';
import { ArtistListItem } from '../../models/artist.model';
import { HomeViewModel } from '../../view-models/home.view-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeViewModel]
})
export class HomeComponent implements OnInit {
  featuredArtworks: ArtworkListItem[] = [];
  featuredArtists: ArtistListItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private viewModel: HomeViewModel,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.featuredArtworks$.subscribe(artworks => this.featuredArtworks = artworks);
    this.viewModel.featuredArtists$.subscribe(artists => this.featuredArtists = artists);
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);

    // Load featured content
    this.viewModel.loadFeaturedContent();
  }
}
