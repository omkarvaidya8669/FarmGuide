package com.example.demo.entities;

public class DummyOrderDetails 
{
	int pfid;
	float amount;
	int quantity;
	int oid;
	public DummyOrderDetails(int pfid, float amount, int quantity, int oid) {
		super();
		this.pfid = pfid;
		this.amount = amount;
		this.quantity = quantity;
		this.oid = oid;
	}
	public DummyOrderDetails() {
		super();
	}
	public int getPfid() {
		return pfid;
	}
	public void setPfid(int pfid) {
		this.pfid = pfid;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getOid() {
		return oid;
	}
	public void setOid(int oid) {
		this.oid = oid;
	}
	
}
