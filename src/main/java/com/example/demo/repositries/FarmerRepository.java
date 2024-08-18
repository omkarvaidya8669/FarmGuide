package com.example.demo.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Farmer;
@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Integer> {

}
