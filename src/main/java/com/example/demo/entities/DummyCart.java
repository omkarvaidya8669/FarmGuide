package com.example.demo.entities;

public class DummyCart 
{
	int pfid;
	int wid;
	int quantity;
	public DummyCart(int pfid, int wid, int quantity) {
		super();
		this.pfid = pfid;
		this.wid = wid;
		this.quantity = quantity;
	}
	public DummyCart() {
		super();
	}
	public int getPfid() {
		return pfid;
	}
	public void setPfid(int pfid) {
		this.pfid = pfid;
	}
	public int getWid() {
		return wid;
	}
	public void setWid(int wid) {
		this.wid = wid;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
