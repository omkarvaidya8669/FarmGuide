package com.example.demo.entities;

public class DummySubProduct
{
	int pid;
	String spname;
	public DummySubProduct(int pid, String spname) {
		super();
		this.pid = pid;
		this.spname = spname;
	}
	public DummySubProduct() {
		super();
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getSpname() {
		return spname;
	}
	public void setSpname(String spname) {
		this.spname = spname;
	}
	
}
