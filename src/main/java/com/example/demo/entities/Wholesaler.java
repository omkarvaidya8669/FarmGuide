package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "wholesaler")
public class Wholesaler {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wid;

    private String fname;
    private String lname;
    private String address;

    @ManyToOne
    @JoinColumn(name = "cityid")
    private City city;

    private String gstNo;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    private String email;
    private Long mobileNo;
	public Wholesaler(String fname, String lname, String address, City city, String gstNo, User user, String email,
			Long mobileNo) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.address = address;
		this.city = city;
		this.gstNo = gstNo;
		this.user = user;
		this.email = email;
		this.mobileNo = mobileNo;
	}
	public Wholesaler() {
		super();
	}
	public Integer getWid() {
		return wid;
	}
	public void setWid(Integer wid) {
		this.wid = wid;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(Long mobileNo) {
		this.mobileNo = mobileNo;
	}

    // getters and setters
    
}
