package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer payid;

    private LocalDateTime paydate;
    private String paytype;
    private Float amount;
    private Integer transactionId;

    @ManyToOne
    @JoinColumn(name = "oid")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "wid")
    private Wholesaler wholesaler;

	public Payment(LocalDateTime paydate, String paytype, Float amount, Integer transactionId, Order order,
			Wholesaler wholesaler) {
		super();
		this.paydate = paydate;
		this.paytype = paytype;
		this.amount = amount;
		this.transactionId = transactionId;
		this.order = order;
		this.wholesaler = wholesaler;
	}

	public Payment() {
		super();
	}

	public Integer getPayid() {
		return payid;
	}

	public void setPayid(Integer payid) {
		this.payid = payid;
	}

	public LocalDateTime getPaydate() {
		return paydate;
	}

	public void setPaydate(LocalDateTime paydate) {
		this.paydate = paydate;
	}

	public String getPaytype() {
		return paytype;
	}

	public void setPaytype(String paytype) {
		this.paytype = paytype;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Integer getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Integer transactionId) {
		this.transactionId = transactionId;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Wholesaler getWholesaler() {
		return wholesaler;
	}

	public void setWholesaler(Wholesaler wholesaler) {
		this.wholesaler = wholesaler;
	}

    // getters and setters
}
