package com.artgallery.artist_management_service.domain.dao;

import com.artgallery.artist_management_service.domain.Artist;
import com.artgallery.artist_management_service.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Implementation of the ArtistDao interface.
 * Uses Spring Data JPA repository for database operations.
 */
@Repository
public class ArtistDaoImpl implements ArtistDao {

    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistDaoImpl(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Override
    public Artist save(Artist artist) {
        return artistRepository.save(artist);
    }

    @Override
    public List<Artist> findAll() {
        return artistRepository.findAll();
    }

    @Override
    public Optional<Artist> findById(Long id) {
        return artistRepository.findById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return artistRepository.existsById(id);
    }

    @Override
    public void deleteById(Long id) {
        artistRepository.deleteById(id);
    }

    @Override
    public List<Artist> findByNameContainingIgnoreCase(String name) {
        return artistRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public boolean existsByNameIgnoreCase(String name) {
        return artistRepository.existsByNameIgnoreCase(name);
    }

    @Override
    public Optional<Artist> findByName(String name) {
        return artistRepository.findByName(name);
    }
}