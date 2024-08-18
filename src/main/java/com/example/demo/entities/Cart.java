package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartid;

    @ManyToOne
    @JoinColumn(name = "pfid")
    private ProductFarmer productFarmer;

    @OneToOne
    @JoinColumn(name = "wid")
    private Wholesaler wholesaler;

    private Integer quantity;

	public ProductFarmer getProductFarmer() {
		return productFarmer;
	}

	public void setProductFarmer(ProductFarmer productFarmer) {
		this.productFarmer = productFarmer;
	}

	public Wholesaler getWholesaler() {
		return wholesaler;
	}

	public void setWholesaler(Wholesaler wholesaler) {
		this.wholesaler = wholesaler;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getCartid() {
		return cartid;
	}

	public void setCartid(Integer cartid) {
		this.cartid = cartid;
	}

	public Cart(ProductFarmer productFarmer, Wholesaler wholesaler, Integer quantity) {
		super();
		this.productFarmer = productFarmer;
		this.wholesaler = wholesaler;
		this.quantity = quantity;
	}

	public Cart() {
		super();
	}

	@Override
	public String toString() {
		String str=productFarmer+" "+wholesaler+" "+quantity;
		return str;
	}
	

    // getters and setters
    
}
