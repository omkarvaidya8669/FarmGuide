package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.SubProduct;
@Repository
public interface SubProductRepository extends JpaRepository<SubProduct, Integer> {
	@Modifying
	@Query(value="select * from subproduct where pid = :id", nativeQuery = true)
	public List<SubProduct>getbyid(int id);
}
