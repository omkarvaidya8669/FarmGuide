package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.OrderDetails;
@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
	@Modifying
	@Query(value="select * from order_details where oid= :oid", nativeQuery = true)
	public List<OrderDetails>getbyoid(int oid);
}
