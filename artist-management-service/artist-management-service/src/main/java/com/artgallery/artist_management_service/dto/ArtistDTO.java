package com.artgallery.artist_management_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtistDTO {

    private Long id;

    @NotBlank(message = "Artist name cannot be blank")
    @Size(min = 2, max = 100, message = "Artist name must be between 2 and 100 characters")
    private String name;

    @PastOrPresent(message = "Date of birth must be in the past or present")
    private LocalDate dateOfBirth;

    @Size(max = 50, message = "Nationality must be at most 50 characters")
    private String nationality;

    private String biography;
}