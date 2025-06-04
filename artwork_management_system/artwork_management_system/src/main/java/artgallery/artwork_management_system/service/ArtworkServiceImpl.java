package artgallery.artwork_management_system.service;

import artgallery.artwork_management_system.domain.dao.ArtworkDao;
import artgallery.artwork_management_system.domain.Artwork;
import artgallery.artwork_management_system.dto.ArtworkDTO;
// Vom avea nevoie de un mapper. Să presupunem că avem o clasă ArtworkMapper.
import artgallery.artwork_management_system.mapper.ArtworkMapper; // Presupunem că există acest mapper
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Important pentru metodele de scriere

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service // Marchează clasa ca un bean de service Spring
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtworkDao artworkDAO;
    private final ArtworkMapper artworkMapper; // Injectăm mapper-ul

    @Autowired
    public ArtworkServiceImpl(ArtworkDao artworkDAO, ArtworkMapper artworkMapper) {
        this.artworkDAO = artworkDAO;
        this.artworkMapper = artworkMapper;
    }

    @Override
    @Transactional // Asigură că operația rulează într-o tranzacție
    public ArtworkDTO createArtwork(ArtworkDTO artworkDTO) {
        Artwork artwork = artworkMapper.artworkDTOToArtwork(artworkDTO);
        // Asigurăm că ID-ul este null pentru a forța o creare (persist în DAO)
        artwork.setId(null);
        Artwork savedArtwork = artworkDAO.save(artwork);
        return artworkMapper.artworkToArtworkDTO(savedArtwork);
    }

    @Override
    @Transactional(readOnly = true) // Tranzacție read-only pentru performanță
    public List<ArtworkDTO> getAllArtworks() {
        return artworkDAO.findAll().stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ArtworkDTO> getArtworkById(Long id) {
        return artworkDAO.findById(id)
                .map(artworkMapper::artworkToArtworkDTO);
    }

    @Override
    @Transactional
    public Optional<ArtworkDTO> updateArtwork(Long id, ArtworkDTO artworkDTO) {
        Optional<Artwork> existingArtworkOpt = artworkDAO.findById(id);
        if (existingArtworkOpt.isPresent()) {
            Artwork artworkToUpdate = existingArtworkOpt.get();
            // Actualizăm câmpurile entității existente cu datele din DTO
            // (Mapper-ul ar putea avea o metodă pentru asta, sau o facem manual)
            artworkMapper.updateArtworkFromDto(artworkDTO, artworkToUpdate);
            // Asigurăm că ID-ul este corect pentru operația de merge din DAO
            artworkToUpdate.setId(id);
            Artwork updatedArtwork = artworkDAO.save(artworkToUpdate);
            return Optional.of(artworkMapper.artworkToArtworkDTO(updatedArtwork));
        }
        return Optional.empty(); // Sau aruncăm o excepție ArtworkNotFoundException
    }

    @Override
    @Transactional
    public boolean deleteArtwork(Long id) {
        if (artworkDAO.existsById(id)) {
            artworkDAO.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtworkDTO> getArtworksByArtistId(Long artistId) {
        return artworkDAO.findByArtistId(artistId).stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtworkDTO> searchArtworksByTitle(String titleFragment) {
        return artworkDAO.findByTitleContainingIgnoreCase(titleFragment).stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtworkDTO> getArtworksByType(Artwork.ArtworkType type) {
        return artworkDAO.findByTypeOfArtwork(type).stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtworkDTO> getArtworksByArtistIdAndType(Long artistId, Artwork.ArtworkType type) {
        return artworkDAO.findByArtistIdAndTypeOfArtwork(artistId, type).stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtworkDTO> getAllArtworksSortedByCreationDate(boolean ascending) {
        List<Artwork> artworks;
        if (ascending) {
            artworks = artworkDAO.findAllByOrderByCreationDateAsc();
        } else {
            artworks = artworkDAO.findAllByOrderByCreationDateDesc();
        }
        return artworks.stream()
                .map(artworkMapper::artworkToArtworkDTO)
                .collect(Collectors.toList());
    }
}