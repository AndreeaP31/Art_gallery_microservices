import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ArtworksRoutingModule } from './artworks-routing.module';
import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkDetailsComponent } from './artwork-details/artwork-details.component';

// View Models
import { ArtworkListViewModel } from '../../view-models/artwork-list.view-model';
import { ArtworkDetailsViewModel } from '../../view-models/artwork-details.view-model';

@NgModule({
  declarations: [
    ArtworkListComponent,
    ArtworkDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArtworksRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    // View models
    ArtworkListViewModel,
    ArtworkDetailsViewModel
  ]
})
export class ArtworksModule { }