package artgallery.artwork_management_system.domain.dao;

import artgallery.artwork_management_system.domain.Artwork;
import artgallery.artwork_management_system.repository.ArtworkRepository; // Importăm Repository-ul
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component; // Sau @Repository, dacă se potrivește semantic
// Deoarece deleagă la un @Repository, @Component e ok.

import java.util.List;
import java.util.Optional;

@Component // Am schimbat în @Component, deoarece logica de persistență e în Repository
public class ArtworkDaoImpl implements ArtworkDao {

    private final ArtworkRepository artworkRepository;

    @Autowired // Injectăm ArtworkRepository prin constructor
    public ArtworkDaoImpl(ArtworkRepository artworkRepository) {
        this.artworkRepository = artworkRepository;
    }

    @Override
    public Artwork save(Artwork artwork) {
        return artworkRepository.save(artwork);
    }

    @Override
    public Optional<Artwork> findById(Long id) {
        return artworkRepository.findById(id);
    }

    @Override
    public List<Artwork> findAll() {
        return artworkRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        artworkRepository.deleteById(id);
    }

    @Override
    public void delete(Artwork artwork) {
        artworkRepository.delete(artwork);
    }

    @Override
    public long count() {
        return artworkRepository.count();
    }

    @Override
    public boolean existsById(Long id) {
        return artworkRepository.existsById(id);
    }

    @Override
    public List<Artwork> findByArtistId(Long artistId) {
        return artworkRepository.findByArtistId(artistId);
    }

    @Override
    public List<Artwork> findByTitleContainingIgnoreCase(String titleFragment) {
        return artworkRepository.findByTitleContainingIgnoreCase(titleFragment);
    }

    @Override
    public List<Artwork> findByTypeOfArtwork(Artwork.ArtworkType type) {
        return artworkRepository.findByTypeOfArtwork(type);
    }

    @Override
    public List<Artwork> findByArtistIdAndTypeOfArtwork(Long artistId, Artwork.ArtworkType type) {
        return artworkRepository.findByArtistIdAndTypeOfArtwork(artistId, type);
    }

    @Override
    public List<Artwork> findAllByOrderByCreationDateAsc() {
        return artworkRepository.findAllByOrderByCreationDateAsc();
    }

    @Override
    public List<Artwork> findAllByOrderByCreationDateDesc() {
        return artworkRepository.findAllByOrderByCreationDateDesc();
    }
}