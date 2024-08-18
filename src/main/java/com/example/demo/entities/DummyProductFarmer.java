package com.example.demo.entities;

public class DummyProductFarmer 
{
	int fid;
	Integer spid;
	int pid;
	float price;
	int quantity;
	
	
	public DummyProductFarmer(int fid, Integer spid, int pid, float price, int quantity) {
		super();
		this.fid = fid;
		this.spid = spid;
		this.pid = pid;
		this.price = price;
		this.quantity = quantity;
	}
	public DummyProductFarmer() {
		super();
	}
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public Integer getSpid() {
		return spid;
	}
	public void setSpid(Integer spid) {
		this.spid = spid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
