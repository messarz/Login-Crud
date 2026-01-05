package com.example.crud.db;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DriverInfo {

    @Bean
    CommandLineRunner loadData(DriverRepo repo) {
        return args -> {

            // Only insert if table is empty
            if (repo.count() == 0) {

                // Red Bull
                repo.save(new DriverTable("Max Verstappen", "Dutch", 27, "Redbull"));
                repo.save(new DriverTable("Liam Lawson", "New Zealander", 22, "Redbull"));

                // Ferrari
                repo.save(new DriverTable("Charles Leclerc", "Monégasque", 27, "Ferrari"));
                repo.save(new DriverTable("Lewis Hamilton", "British", 40, "Ferrari"));

                // McLaren
                repo.save(new DriverTable("Lando Norris", "British", 25, "McLaren"));
                repo.save(new DriverTable("Oscar Piastri", "Australian", 24, "McLaren"));

                // Mercedes
                repo.save(new DriverTable("George Russell", "British", 26, "Mercedes"));
                repo.save(new DriverTable("Andrea Kimi Antonelli", "Italian", 18, "Mercedes"));

                // Aston Martin
                repo.save(new DriverTable("Fernando Alonso", "Spanish", 43, "Aston Martin"));
                repo.save(new DriverTable("Lance Stroll", "Canadian", 26, "Aston Martin"));

                // Alpine
                repo.save(new DriverTable("Pierre Gasly", "French", 28, "Alpine"));
                repo.save(new DriverTable("Jack Doohan", "Australian", 21, "Alpine"));

                // Haas
                repo.save(new DriverTable("Esteban Ocon", "French", 28, "Haas"));
                repo.save(new DriverTable("Oliver Bearman", "British", 20, "Haas"));

                // Racing Bulls
                repo.save(new DriverTable("Yuki Tsunoda", "Japanese", 24, "Racing Bulls"));
                repo.save(new DriverTable("Isack Hadjar", "French", 21, "Racing Bulls"));

                // Williams
                repo.save(new DriverTable("Alexander Albon", "Thai", 28, "Williams"));
                repo.save(new DriverTable("Carlos Sainz", "Spanish", 30, "Williams"));

                // Kick Sauber
                repo.save(new DriverTable("Nico Hülkenberg", "German", 37, "Kick Sauber"));
                repo.save(new DriverTable("Gabriel Bortoleto", "Brazilian", 20, "Kick Sauber"));

            } // end if
        };
    }
}

