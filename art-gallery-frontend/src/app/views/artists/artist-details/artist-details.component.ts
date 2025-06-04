import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistDetailsViewModel } from '../../../view-models/artist-details.view-model';
import { Artist } from '../../../models/artist.model';
import { ArtworkListItem } from '../../../models/artwork.model';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  providers: [ArtistDetailsViewModel]
})
export class ArtistDetailsComponent implements OnInit {
  artist: Artist | null = null;
  artworks: ArtworkListItem[] = [];
  loading = false;
  error: string | null = null;
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private viewModel: ArtistDetailsViewModel
  ) { }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.artist$.subscribe(artist => this.artist = artist);
    this.viewModel.artworks$.subscribe(artworks => this.artworks = artworks);
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
    this.viewModel.canEdit$.subscribe(canEdit => this.canEdit = canEdit);
    
    // Get artist ID from route params and load artist
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.viewModel.loadArtist(+id);
      }
    });
  }
}