package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_farmer")
public class ProductFarmer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pfid;

    @ManyToOne
    @JoinColumn(name = "fid")
    private Farmer farmer;

    @ManyToOne
    @JoinColumn(name = "spid")
    private SubProduct subProduct;

    private Float price;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "pid")
    private Product product;


	public ProductFarmer(Farmer farmer, SubProduct subProduct, Float price, Integer quantity, Product product) {
		super();
		this.farmer = farmer;
		this.subProduct = subProduct;
		this.price = price;
		this.quantity = quantity;
		this.product = product;
	}

	public ProductFarmer() {
		super();
	}

	public Integer getPfid() {
		return pfid;
	}

	public void setPfid(Integer pfid) {
		this.pfid = pfid;
	}

	public Farmer getFarmer() {
		return farmer;
	}

	public void setFarmer(Farmer farmer) {
		this.farmer = farmer;
	}

	public SubProduct getSubProduct() {
		return subProduct;
	}

	public void setSubProduct(SubProduct subProduct) {
		this.subProduct = subProduct;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	

    // getters and setters
}
