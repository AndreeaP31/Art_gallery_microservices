package artgallery.artwork_management_system.service;

import artgallery.artwork_management_system.domain.Artwork; // Pentru tipul ArtworkType
import artgallery.artwork_management_system.dto.ArtworkDTO;

import java.util.List;
import java.util.Optional;

public interface ArtworkService {


    ArtworkDTO createArtwork(ArtworkDTO artworkDTO);
    List<ArtworkDTO> getAllArtworks();
    Optional<ArtworkDTO> getArtworkById(Long id);
    Optional<ArtworkDTO> updateArtwork(Long id, ArtworkDTO artworkDTO);
    boolean deleteArtwork(Long id);
    List<ArtworkDTO> getArtworksByArtistId(Long artistId);
    List<ArtworkDTO> searchArtworksByTitle(String titleFragment);
    List<ArtworkDTO> getArtworksByType(Artwork.ArtworkType type);
    List<ArtworkDTO> getArtworksByArtistIdAndType(Long artistId, Artwork.ArtworkType type);
    List<ArtworkDTO> getAllArtworksSortedByCreationDate(boolean ascending);
}