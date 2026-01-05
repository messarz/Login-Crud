package com.example.crud.controller;


import com.example.crud.db2.Crud;
import com.example.crud.db2.crudRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crud")


public class crudController {

  //Post
  @Autowired

  private crudRepo CrudRepo;

  @PostMapping("/addCrud")
  public ResponseEntity<Crud> createCrud(@RequestBody Crud CrudComment) {
    Crud response = CrudRepo.save(CrudComment);
    return ResponseEntity.ok(response);
  }

  //Fetch All
  @GetMapping("/fetch")
  public List<Crud> getAll() {
    return CrudRepo.findAll();
  }

  //Fetch ID
  @GetMapping("/id/{id}")
  public Crud getCrudId(@PathVariable Long id) {
    return CrudRepo.findById(id).orElse(null);

  }

  @PutMapping("/update/{id}")
  public Crud updateCrud(@PathVariable Long id, @RequestBody Crud crud) {

    Crud existingData = CrudRepo.findById(id).orElse(null);

    if (existingData != null) {

      existingData.setName(crud.getName());
      existingData.setComment(crud.getComment());

      CrudRepo.save(existingData);
      return existingData;

    } else {

      return null;
    }

  }




  @DeleteMapping("/delete/{id}")
  public void deleteCrud(@PathVariable Long id) {

    CrudRepo.deleteById(id);
  }

}
