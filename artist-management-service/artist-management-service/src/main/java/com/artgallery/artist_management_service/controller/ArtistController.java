package com.artgallery.artist_management_service.controller;

import com.artgallery.artist_management_service.dto.ArtistDTO;
import com.artgallery.artist_management_service.service.ArtistService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/artists") // Un prefix comun pentru API-ul artiștilor
public class ArtistController {

    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @PostMapping
    public ResponseEntity<ArtistDTO> createArtist(@Valid @RequestBody ArtistDTO artistDTO) {
        ArtistDTO createdArtist = artistService.createArtist(artistDTO);
        return new ResponseEntity<>(createdArtist, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ArtistDTO>> getAllArtists() {
        List<ArtistDTO> artists = artistService.getAllArtists();
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtistDTO> getArtistById(@PathVariable Long id) {
        ArtistDTO artist = artistService.getArtistById(id);
        return ResponseEntity.ok(artist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtistDTO> updateArtist(@PathVariable Long id, @Valid @RequestBody ArtistDTO artistDTO) {
        ArtistDTO updatedArtist = artistService.updateArtist(id, artistDTO);
        return ResponseEntity.ok(updatedArtist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable Long id) {
        artistService.deleteArtist(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }

    @GetMapping("/search") // ex: /api/v1/artists/search?name=Van Gogh
    public ResponseEntity<List<ArtistDTO>> searchArtistsByName(@RequestParam String name) {
        List<ArtistDTO> artists = artistService.searchArtistsByName(name);
        return ResponseEntity.ok(artists);
    }
}
