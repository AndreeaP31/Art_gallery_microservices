package com.artgallery.artist_management_service.service;
import org.modelmapper.ModelMapper;
import com.artgallery.artist_management_service.domain.Artist;
import com.artgallery.artist_management_service.dto.ArtistDTO;
import com.artgallery.artist_management_service.domain.dao.ArtistDao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtistServiceImpl implements ArtistService {

    private final ArtistDao artistDao;
    private final ModelMapper modelMapper; // Injectat din configurația aplicației

    @Autowired
    public ArtistServiceImpl(ArtistDao artistDao, ModelMapper modelMapper) {
        this.artistDao = artistDao;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public ArtistDTO createArtist(ArtistDTO artistDTO) {
        // Verificări suplimentare (de ex. dacă un artist cu același nume există deja) pot fi adăugate aici
        if (artistDao.existsByNameIgnoreCase(artistDTO.getName())) {
            // Poți arunca o excepție custom aici, de ex. DuplicateResourceException
            throw new IllegalArgumentException("Artist with name '" + artistDTO.getName() + "' already exists.");
        }
        Artist artist = modelMapper.map(artistDTO, Artist.class);
        Artist savedArtist = artistDao.save(artist);
        return modelMapper.map(savedArtist, ArtistDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtistDTO> getAllArtists() {
        return artistDao.findAll().stream()
                .map(artist -> modelMapper.map(artist, ArtistDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ArtistDTO getArtistById(Long id) {
        Artist artist = artistDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Artist not found with id: " + id));
        return modelMapper.map(artist, ArtistDTO.class);
    }

    @Override
    @Transactional
    public ArtistDTO updateArtist(Long id, ArtistDTO artistDTO) {
        Artist existingArtist = artistDao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Artist not found with id: " + id));

        // Actualizează câmpurile
        existingArtist.setName(artistDTO.getName());
        existingArtist.setDateOfBirth(artistDTO.getDateOfBirth());
        existingArtist.setNationality(artistDTO.getNationality());
        existingArtist.setBiography(artistDTO.getBiography());
        // Nu actualizăm ID-ul

        Artist updatedArtist = artistDao.save(existingArtist);
        return modelMapper.map(updatedArtist, ArtistDTO.class);
    }

    @Override
    @Transactional
    public void deleteArtist(Long id) {
        if (!artistDao.existsById(id)) {
            throw new EntityNotFoundException("Artist not found with id: " + id + ". Cannot delete.");
        }
        // TODO: Verifică dacă artistul are opere asociate înainte de a șterge
        // Dacă da, poate ar trebui să împiedici ștergerea sau să ștergi/dezasociezi operele (depinde de logica de business)
        artistDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ArtistDTO> searchArtistsByName(String name) {
        return artistDao.findByNameContainingIgnoreCase(name).stream()
                .map(artist -> modelMapper.map(artist, ArtistDTO.class))
                .collect(Collectors.toList());
    }
}
