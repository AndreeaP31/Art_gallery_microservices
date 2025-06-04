package artgallery.artwork_management_system;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// Removed EnableFeignClients since there are no Feign clients in the project
// import org.springframework.cloud.openfeign.EnableFeignClients;
// Dacă folosești Spring Data JPA și ai repository-urile în alt pachet decât cel de bază
// și subpachetele sale, ai putea avea nevoie de @EnableJpaRepositories.
// Dar cu structura standard, @SpringBootApplication ar trebui să fie suficient.
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Dacă ai componente (beans) în alte pachete rădăcină care nu sunt scanate implicit,
// ai putea folosi @ComponentScan. De obicei, @SpringBootApplication acoperă pachetul curent și subpachetele.
// import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// Exemplu dacă repository-urile ar fi într-un pachet complet diferit:
// @EnableJpaRepositories(basePackages = "artgallery.artwork_management_system.repository")
// Exemplu dacă ai beans în pachete care nu sunt sub-pachete ale acestuia:
// @ComponentScan(basePackages = {"artgallery.artwork_management_system", "alt.pachet.radacina"})
public class ArtworkManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtworkManagementSystemApplication.class, args);
	}

}
