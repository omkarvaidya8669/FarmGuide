package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Order;

import jakarta.transaction.Transactional;
@Transactional
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Modifying
	@Query(value="select * from orders where wid= :wid", nativeQuery = true)
	public List<Order>findbywid(int wid);
}
