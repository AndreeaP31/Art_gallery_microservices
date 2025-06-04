import { Component, OnInit } from '@angular/core';
import { ArtistListViewModel } from '../../../view-models/artist-list.view-model';
import { ArtistListItem } from '../../../models/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  providers: [ArtistListViewModel]
})
export class ArtistListComponent implements OnInit {
  artists: ArtistListItem[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';

  constructor(private viewModel: ArtistListViewModel) { }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.artists$.subscribe(artists => this.artists = artists);
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
    this.viewModel.searchQuery$.subscribe(query => this.searchQuery = query);
    
    // Load artists
    this.viewModel.loadArtists();
  }

  search(): void {
    this.viewModel.searchArtists(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.viewModel.clearSearch();
  }
}