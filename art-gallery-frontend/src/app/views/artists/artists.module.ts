import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

// View Models
import { ArtistListViewModel } from '../../view-models/artist-list.view-model';
import { ArtistDetailsViewModel } from '../../view-models/artist-details.view-model';

@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArtistsRoutingModule,
    TranslateModule.forChild()
  ],
  providers: [
    // View models
    ArtistListViewModel,
    ArtistDetailsViewModel
  ]
})
export class ArtistsModule { }
