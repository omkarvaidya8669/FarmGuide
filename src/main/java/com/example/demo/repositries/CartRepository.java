package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Cart;

import jakarta.transaction.Transactional;
@Transactional
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
	@Modifying
	@Query(value="select * from cart where wid = :wid", nativeQuery = true)
	public List<Cart>findAllById(int wid);
	
	@Modifying
	@Query(value="delete from cart where wid = :wid", nativeQuery = true)
	public void deletebywid(int wid);
}
