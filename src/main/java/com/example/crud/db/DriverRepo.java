package com.example.crud.db;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepo extends JpaRepository<DriverTable, Long> {
}
