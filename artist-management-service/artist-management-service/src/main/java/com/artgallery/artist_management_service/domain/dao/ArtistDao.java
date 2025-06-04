package com.artgallery.artist_management_service.domain.dao;

import com.artgallery.artist_management_service.domain.Artist;

import java.util.List;
import java.util.Optional;

/**
 * Data Access Object interface for Artist entity.
 * Provides methods for CRUD operations and custom queries.
 */
public interface ArtistDao {
    
    /**
     * Save an artist to the database.
     * 
     * @param artist the artist to save
     * @return the saved artist with generated ID
     */
    Artist save(Artist artist);
    
    /**
     * Find all artists in the database.
     * 
     * @return a list of all artists
     */
    List<Artist> findAll();
    
    /**
     * Find an artist by ID.
     * 
     * @param id the ID of the artist to find
     * @return an Optional containing the artist if found, or empty if not found
     */
    Optional<Artist> findById(Long id);
    
    /**
     * Check if an artist with the given ID exists.
     * 
     * @param id the ID to check
     * @return true if an artist with the ID exists, false otherwise
     */
    boolean existsById(Long id);
    
    /**
     * Delete an artist by ID.
     * 
     * @param id the ID of the artist to delete
     */
    void deleteById(Long id);
    
    /**
     * Find artists whose names contain the given string (case-insensitive).
     * 
     * @param name the name to search for
     * @return a list of artists whose names contain the given string
     */
    List<Artist> findByNameContainingIgnoreCase(String name);
    
    /**
     * Check if an artist with the given name exists (case-insensitive).
     * 
     * @param name the name to check
     * @return true if an artist with the name exists, false otherwise
     */
    boolean existsByNameIgnoreCase(String name);
    
    /**
     * Find an artist by exact name.
     * 
     * @param name the name to search for
     * @return an Optional containing the artist if found, or empty if not found
     */
    Optional<Artist> findByName(String name);
}