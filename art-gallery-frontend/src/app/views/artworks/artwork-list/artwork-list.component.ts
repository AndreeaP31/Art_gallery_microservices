import { Component, OnInit } from '@angular/core';
import { ArtworkListViewModel } from '../../../view-models/artwork-list.view-model';
import { ArtworkListItem, ArtworkType, ArtworkFilter } from '../../../models/artwork.model';
import { ArtistListItem } from '../../../models/artist.model';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.scss'],
  providers: [ArtworkListViewModel]
})
export class ArtworkListComponent implements OnInit {
  artworks: ArtworkListItem[] = [];
  artists: ArtistListItem[] = [];
  artworkTypes = Object.values(ArtworkType);
  loading = false;
  error: string | null = null;
  searchQuery = '';
  
  // Filter properties
  filter: ArtworkFilter = {};
  
  constructor(private viewModel: ArtworkListViewModel) { }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.artworks$.subscribe(artworks => this.artworks = artworks);
    this.viewModel.artists$.subscribe(artists => this.artists = artists);
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
    this.viewModel.searchQuery$.subscribe(query => this.searchQuery = query);
    this.viewModel.filter$.subscribe(filter => this.filter = filter);
    
    // Load artworks and artists for filter
    this.viewModel.loadArtworks();
    this.viewModel.loadArtists();
  }

  search(): void {
    this.viewModel.searchArtworks(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.viewModel.clearSearch();
  }

  applyFilter(): void {
    this.viewModel.filterArtworks(this.filter);
  }

  clearFilters(): void {
    this.filter = {};
    this.viewModel.clearFilters();
  }
}