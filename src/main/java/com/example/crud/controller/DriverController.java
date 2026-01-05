package com.example.crud.controller;

import com.example.crud.db.DriverRepo;
import com.example.crud.db.DriverTable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/driver")

public class DriverController {

  private final DriverRepo driverRepo;

  public DriverController(DriverRepo driverRepo) {
    this.driverRepo = driverRepo;
  }


  @GetMapping
  public List<DriverTable> getAllDrivers() {
    return driverRepo.findAll();
  }

  // GET /driver/count - get total number of drivers
  @GetMapping("/count")
  public long getDriverCount() {
    return driverRepo.count();
  }

  // GET /driver/hello - test endpoint

}

