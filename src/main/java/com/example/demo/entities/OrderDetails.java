package com.example.demo.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer odetailid;

    @ManyToOne
    @JoinColumn(name = "pfid")
    private ProductFarmer productFarmer;

    private Float amount;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "oid")
    private Order order;

	public OrderDetails(ProductFarmer productFarmer, Float amount, Integer quantity, Order order) {
		super();
		this.productFarmer = productFarmer;
		this.amount = amount;
		this.quantity = quantity;
		this.order = order;
	}

	public OrderDetails() {
		super();
	}

	public Integer getOdetailid() {
		return odetailid;
	}

	public void setOdetailid(Integer odetailid) {
		this.odetailid = odetailid;
	}

	public ProductFarmer getProductFarmer() {
		return productFarmer;
	}

	public void setProductFarmer(ProductFarmer productFarmer) {
		this.productFarmer = productFarmer;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

    // getters and setters
    
}
