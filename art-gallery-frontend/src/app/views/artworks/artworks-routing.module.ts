import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkListComponent } from './artwork-list/artwork-list.component';
import { ArtworkDetailsComponent } from './artwork-details/artwork-details.component';

const routes: Routes = [
  {
    path: '',
    component: ArtworkListComponent
  },
  {
    path: ':id',
    component: ArtworkDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworksRoutingModule { }