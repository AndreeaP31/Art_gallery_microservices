import { Artwork } from './artwork.model';

export interface Artist {
  id: number;
  name: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  photoUrl: string;
  biography: string;
  artworks?: Artwork[];
}

export interface ArtistListItem {
  id: number;
  name: string;
  nationality: string;
  photoUrl: string;
}
