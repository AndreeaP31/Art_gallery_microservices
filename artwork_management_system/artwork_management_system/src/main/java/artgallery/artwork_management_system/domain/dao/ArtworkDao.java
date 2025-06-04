package artgallery.artwork_management_system.domain.dao;

import artgallery.artwork_management_system.domain.Artwork;
import java.util.List;
import java.util.Optional;

public interface ArtworkDao {

    Artwork save(Artwork artwork);

    Optional<Artwork> findById(Long id);

    List<Artwork> findAll();

    void deleteById(Long id);

    void delete(Artwork artwork); // Adăugat pentru consistență cu JpaRepository

    long count(); // Adăugat pentru consistență cu JpaRepository

    boolean existsById(Long id); // Adăugat pentru consistență cu JpaRepository

    List<Artwork> findByArtistId(Long artistId);

    List<Artwork> findByTitleContainingIgnoreCase(String titleFragment); // Aliniat cu Spring Data JPA

    List<Artwork> findByTypeOfArtwork(Artwork.ArtworkType type);

    List<Artwork> findByArtistIdAndTypeOfArtwork(Long artistId, Artwork.ArtworkType type);

    List<Artwork> findAllByOrderByCreationDateAsc(); // Aliniat cu Spring Data JPA

    List<Artwork> findAllByOrderByCreationDateDesc(); // Aliniat cu Spring Data JPA
}