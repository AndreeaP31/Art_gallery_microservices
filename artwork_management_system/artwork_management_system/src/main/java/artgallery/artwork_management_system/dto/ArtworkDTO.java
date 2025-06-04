package artgallery.artwork_management_system.dto;

import artgallery.artwork_management_system.domain.Artwork; // Necesar pentru ArtworkType

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class ArtworkDTO {

    private Long id;
    private String title;
    private Long artistId;
    private LocalDate creationDate;
    private Double price;
    private Artwork.ArtworkType typeOfArtwork;

    // Constructor fără argumente
    public ArtworkDTO() {
    }

    // Constructor cu toate argumentele
    public ArtworkDTO(Long id, String title, Long artistId, LocalDate creationDate, Double price, Artwork.ArtworkType typeOfArtwork) {
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


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Artwork.ArtworkType getTypeOfArtwork() {
        return typeOfArtwork;
    }

    public void setTypeOfArtwork(Artwork.ArtworkType typeOfArtwork) {
        this.typeOfArtwork = typeOfArtwork;
    }


    // Metode equals, hashCode și toString (opționale pentru DTO-uri, dar utile)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArtworkDTO that = (ArtworkDTO) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(title, that.title) &&
                Objects.equals(artistId, that.artistId) &&
                Objects.equals(creationDate, that.creationDate) &&
                Objects.equals(price, that.price) &&
                typeOfArtwork == that.typeOfArtwork;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, artistId, creationDate, price, typeOfArtwork);
    }

    @Override
    public String toString() {
        return "ArtworkDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", artistId=" + artistId +
                ", creationDate=" + creationDate +
                ", price=" + price +
                ", typeOfArtwork=" + typeOfArtwork +
                '}';
    }
}