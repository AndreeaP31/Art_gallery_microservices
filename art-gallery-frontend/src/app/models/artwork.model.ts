import { Artist } from './artist.model';

export enum ArtworkType {
  PAINTING = 'PAINTING',
  SCULPTURE = 'SCULPTURE',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  DRAWING = 'DRAWING',
  PRINTMAKING = 'PRINTMAKING',
  MIXED_MEDIA = 'MIXED_MEDIA',
  DIGITAL_ART = 'DIGITAL_ART',
  INSTALLATION = 'INSTALLATION',
  OTHER = 'OTHER'
}

export interface Artwork {
  id: number;
  title: string;
  description: string;
  creationYear: number;
  type: ArtworkType;
  dimensions: string;
  price: number;
  sold: boolean;
  galleryId: number;
  artistId: number;
  artist?: Artist;
  imageUrls: string[];
}

export interface ArtworkListItem {
  id: number;
  title: string;
  creationYear: number;
  type: ArtworkType;
  artistName: string;
  price: number;
  sold: boolean;
  imageUrl: string;
}

export interface ArtworkFilter {
  artistId?: number;
  type?: ArtworkType;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  sold?: boolean;
}