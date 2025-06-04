package artgallery.artwork_management_system.mapper;

import artgallery.artwork_management_system.domain.Artwork;
import artgallery.artwork_management_system.dto.ArtworkDTO;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component // Marchează clasa ca un bean Spring
public class ArtworkMapper {

    public ArtworkDTO artworkToArtworkDTO(Artwork artwork) {
        if (artwork == null) {
            return null;
        }
        return new ArtworkDTO(
                artwork.getId(),
                artwork.getTitle(),
                artwork.getArtistId(),
                artwork.getCreationDate(),
                artwork.getPrice(),
                artwork.getTypeOfArtwork()
        );
    }

    public Artwork artworkDTOToArtwork(ArtworkDTO artworkDTO) {
        if (artworkDTO == null) {
            return null;
        }
        Artwork artwork = new Artwork();
        artwork.setId(artworkDTO.getId()); // Poate fi null pentru creare
        artwork.setTitle(artworkDTO.getTitle());
        artwork.setArtistId(artworkDTO.getArtistId());
        artwork.setCreationDate(artworkDTO.getCreationDate());
        artwork.setPrice(artworkDTO.getPrice());
        artwork.setTypeOfArtwork(artworkDTO.getTypeOfArtwork());
        return artwork;
    }

    /**
     * Actualizează o entitate Artwork existentă cu datele dintr-un ArtworkDTO.
     * Nu modifică ID-ul.
     * @param dto Sursa datelor.
     * @param entity Entitatea de actualizat.
     */
    public void updateArtworkFromDto(ArtworkDTO dto, Artwork entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setTitle(dto.getTitle());
        entity.setArtistId(dto.getArtistId());
        entity.setCreationDate(dto.getCreationDate());
        entity.setPrice(dto.getPrice());
        entity.setTypeOfArtwork(dto.getTypeOfArtwork());
    }
}