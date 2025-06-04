package artgallery.artwork_management_system.repository;

import artgallery.artwork_management_system.domain.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Marchează această interfață ca un bean Spring și componentă de persistență
public interface ArtworkRepository extends JpaRepository<Artwork, Long> {

    /**
     * Găsește operele de artă după ID-ul artistului.
     * Numele metodei este interpretat de Spring Data JPA pentru a genera interogarea.
     * @param artistId ID-ul artistului.
     * @return O listă de opere de artă pentru artistul specificat.
     */
    List<Artwork> findByArtistId(Long artistId);

    /**
     * Găsește operele de artă al căror titlu conține un text specificat (case-insensitive).
     * Spring Data JPA va face căutarea case-insensitive datorită 'IgnoreCase'.
     * @param titleFragment Fragmentul de titlu de căutat.
     * @return O listă de opere de artă care corespund criteriului.
     */
    List<Artwork> findByTitleContainingIgnoreCase(String titleFragment);

    /**
     * Găsește operele de artă de un anumit tip.
     * @param type Tipul operei de artă.
     * @return O listă de opere de artă de tipul specificat.
     */
    List<Artwork> findByTypeOfArtwork(Artwork.ArtworkType type);

    /**
     * Găsește operele de artă pentru un artist și un tip specific.
     * @param artistId ID-ul artistului.
     * @param type Tipul operei de artă.
     * @return O listă de opere de artă care corespund criteriilor.
     */
    List<Artwork> findByArtistIdAndTypeOfArtwork(Long artistId, Artwork.ArtworkType type);

    /**
     * Returnează toate operele de artă sortate după data creației în ordine ascendentă.
     * @return O listă sortată de opere de artă.
     */
    List<Artwork> findAllByOrderByCreationDateAsc();

    /**
     * Returnează toate operele de artă sortate după data creației în ordine descendentă.
     * @return O listă sortată de opere de artă.
     */
    List<Artwork> findAllByOrderByCreationDateDesc();

    // Alternativ, pentru o sortare dinamică (dacă ai nevoie doar de una din cele două):
    // @Query("SELECT a FROM Artwork a ORDER BY a.creationDate ASC")
    // List<Artwork> findAllOrderByCreationDateAscQuery();
    //
    // @Query("SELECT a FROM Artwork a ORDER BY a.creationDate DESC")
    // List<Artwork> findAllOrderByCreationDateDescQuery();

    // Dacă vrei o metodă care acceptă direcția de sortare ca parametru,
    // ai putea folosi Pageable sau Sort, dar pentru o listă completă,
    // este mai simplu să ai două metode separate sau să construiești interogarea
    // dinamic în service dacă folosești Specification API sau Querydsl.
    // Pentru sortare simplă ca în DAO-ul anterior, două metode sunt clare.
}