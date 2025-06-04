import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtworkDetailsViewModel } from '../../../view-models/artwork-details.view-model';
import { Artwork } from '../../../models/artwork.model';

@Component({
  selector: 'app-artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrls: ['./artwork-details.component.scss'],
  providers: [ArtworkDetailsViewModel]
})
export class ArtworkDetailsComponent implements OnInit {
  artwork: Artwork | null = null;
  loading = false;
  error: string | null = null;
  canEdit = false;
  canSell = false;

  constructor(
    private route: ActivatedRoute,
    private viewModel: ArtworkDetailsViewModel
  ) { }

  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.artwork$.subscribe(artwork => this.artwork = artwork);
    this.viewModel.loading$.subscribe(loading => this.loading = loading);
    this.viewModel.error$.subscribe(error => this.error = error);
    this.viewModel.canEdit$.subscribe(canEdit => this.canEdit = canEdit);
    this.viewModel.canSell$.subscribe(canSell => this.canSell = canSell);
    
    // Get artwork ID from route params and load artwork
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.viewModel.loadArtwork(+id);
      }
    });
  }

  sellArtwork(): void {
    this.viewModel.sellArtwork();
  }
}