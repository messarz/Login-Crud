package com.example.crud.db;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name= "Table01")


public class DriverTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private String nationality;
    private Integer age;
    private String team;


    // ✅ No-arg constructor required by JPA
    public DriverTable() { }

    // ✅ Parameterized constructor for DataLoader
    public DriverTable(String name, String nationality, int age, String team) {
        this.name = name;
        this.nationality = nationality;
        this.age = age;
        this.team = team;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }
}

