package com.example.demo.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Wholesaler;
@Repository
public interface WholesalerRepository extends JpaRepository<Wholesaler, Integer> {

}
