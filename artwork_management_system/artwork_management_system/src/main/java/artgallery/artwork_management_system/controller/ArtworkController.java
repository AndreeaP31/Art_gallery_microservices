package artgallery.artwork_management_system.controller;

import artgallery.artwork_management_system.domain.Artwork; // Pentru ArtworkType
import artgallery.artwork_management_system.dto.ArtworkDTO;
import artgallery.artwork_management_system.service.ArtworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/artworks") // Un prefix comun pentru endpoint-uri
public class ArtworkController {

    private final ArtworkService artworkService;

    @Autowired
    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @PostMapping
    public ResponseEntity<ArtworkDTO> createArtwork(@RequestBody ArtworkDTO artworkDTO) {
        ArtworkDTO createdArtwork = artworkService.createArtwork(artworkDTO);
        return new ResponseEntity<>(createdArtwork, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ArtworkDTO>> getAllArtworks(
            @RequestParam(required = false) Boolean sortByCreationDateAsc) {
        List<ArtworkDTO> artworks;
        if (sortByCreationDateAsc != null) {
            artworks = artworkService.getAllArtworksSortedByCreationDate(sortByCreationDateAsc);
        } else {
            artworks = artworkService.getAllArtworks();
        }
        return ResponseEntity.ok(artworks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtworkDTO> getArtworkById(@PathVariable Long id) {
        Optional<ArtworkDTO> artworkDTO = artworkService.getArtworkById(id);
        return artworkDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtworkDTO> updateArtwork(@PathVariable Long id, @RequestBody ArtworkDTO artworkDTO) {
        Optional<ArtworkDTO> updatedArtwork = artworkService.updateArtwork(id, artworkDTO);
        return updatedArtwork.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtwork(@PathVariable Long id) {
        boolean deleted = artworkService.deleteArtwork(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<List<ArtworkDTO>> getArtworksByArtist(@PathVariable Long artistId) {
        List<ArtworkDTO> artworks = artworkService.getArtworksByArtistId(artistId);
        return ResponseEntity.ok(artworks);
    }

    @GetMapping("/search/title")
    public ResponseEntity<List<ArtworkDTO>> searchArtworksByTitle(@RequestParam String query) {
        List<ArtworkDTO> artworks = artworkService.searchArtworksByTitle(query);
        return ResponseEntity.ok(artworks);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ArtworkDTO>> getArtworksByType(@PathVariable Artwork.ArtworkType type) {
        List<ArtworkDTO> artworks = artworkService.getArtworksByType(type);
        return ResponseEntity.ok(artworks);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ArtworkDTO>> getArtworksByArtistAndType(
            @RequestParam Long artistId,
            @RequestParam Artwork.ArtworkType type) {
        List<ArtworkDTO> artworks = artworkService.getArtworksByArtistIdAndType(artistId, type);
        return ResponseEntity.ok(artworks);
    }
}