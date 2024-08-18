package com.example.demo.entities;

public class DummyUpdateProductFarmer 
{
	int quantity;
	float price;
	public DummyUpdateProductFarmer(int quantity, float price) {
		super();
		this.quantity = quantity;
		this.price = price;
	}
	public DummyUpdateProductFarmer() {
		super();
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	
}
