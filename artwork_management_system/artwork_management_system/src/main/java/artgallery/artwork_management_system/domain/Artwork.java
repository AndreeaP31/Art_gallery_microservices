package artgallery.artwork_management_system.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
// Importul java.math.BigDecimal nu mai este necesar
@Entity
@Table(name = "artworks")
@Getter
@Setter
public class Artwork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "artist_id", nullable = false)
    private Long artistId;

    @Column(name = "creation_date")
    private LocalDate creationDate;


    // Schimbat tipul în Double și eliminat precision/scale din @Column
    @Column // (nullable = true by default) dacă poate fi null.
    // Dacă trebuie să fie NOT NULL, adaugă nullable = false
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_artwork", length = 50, nullable = false)
    private ArtworkType typeOfArtwork;



    public enum ArtworkType {
        SCULPTURE,
        PAINTING,
        PHOTOGRAPHY
    }

    // Constructor fără argumente (necesar pentru JPA)
    public Artwork() {
    }

    // Constructor cu toate argumentele actualizat pentru Double
    public Artwork(Long id, String title, Long artistId, LocalDate creationDate, String dimensions, Double price, ArtworkType typeOfArtwork, List<String> images) {
        this.id = id;
        this.title = title;
        this.artistId = artistId;
        this.creationDate = creationDate;
        this.price = price;
        this.typeOfArtwork = typeOfArtwork;
    }

    // Getteri și Setteri
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }


    // Getter și Setter pentru price actualizat la Double
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public ArtworkType getTypeOfArtwork() {
        return typeOfArtwork;
    }

    public void setTypeOfArtwork(ArtworkType typeOfArtwork) {
        this.typeOfArtwork = typeOfArtwork;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Artwork artwork = (Artwork) o;
        return id != null && id.equals(artwork.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Artwork{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", artistId=" + artistId +
                ", creationDate=" + creationDate +
                ", price=" + price + // Acum Double
                ", typeOfArtwork=" + typeOfArtwork +
                '}';
    }
}