package com.artgallery.artist_management_service;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class ArtistManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtistManagementServiceApplication.class, args);
	}

	@Bean // Adaugă ModelMapper ca bean pentru a putea fi injectat
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
