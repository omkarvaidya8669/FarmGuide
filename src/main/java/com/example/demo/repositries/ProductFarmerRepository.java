package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ProductFarmer;

import jakarta.transaction.Transactional;
@Transactional
@Repository
public interface ProductFarmerRepository extends JpaRepository<ProductFarmer, Integer> {
	@Modifying
	@Query(value="select * from product_farmer where fid = :fid", nativeQuery = true)
	public List<ProductFarmer> getbyfid(int fid);
	
	@Query("SELECT p.price FROM ProductFarmer p WHERE p.pfid = :pfid")
	float getpricebypfid(@Param("pfid") int pfid);
	
	@Modifying
	@Query(value="update product_farmer set price= :price, quantity= :quantity where pfid= :pfid", nativeQuery = true)
	public int updatepfrmr(int pfid,float price, int quantity);
	
	@Modifying
	@Query(value="update product_farmer set quantity= (quantity-:quantity) where pfid= :pfid", nativeQuery = true)
	public int updateqty(int quantity, int pfid);
}
