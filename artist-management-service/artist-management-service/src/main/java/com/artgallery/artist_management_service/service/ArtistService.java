package com.artgallery.artist_management_service.service;

import com.artgallery.artist_management_service.dto.ArtistDTO;

import java.util.List;

public interface ArtistService {
    ArtistDTO createArtist(ArtistDTO artistDTO);
    List<ArtistDTO> getAllArtists();
    ArtistDTO getArtistById(Long id);
    ArtistDTO updateArtist(Long id, ArtistDTO artistDTO);
    void deleteArtist(Long id);
    List<ArtistDTO> searchArtistsByName(String name);
}