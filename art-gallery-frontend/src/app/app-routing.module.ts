import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define routes
const routes: Routes = [
  // Lazy loaded modules
  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'artists', loadChildren: () => import('./views/artists/artists.module').then(m => m.ArtistsModule) },
  { path: 'artworks', loadChildren: () => import('./views/artworks/artworks.module').then(m => m.ArtworksModule) },
  // TODO: Implement these modules
  // { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },

  // Redirect to home for empty path
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Wildcard route for 404 page
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
