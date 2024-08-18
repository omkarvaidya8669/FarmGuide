package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "farmer")
public class Farmer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fid;

    private String fname;
    private String lname;
    private Long aadharNo;
    private String address;

    @ManyToOne
    @JoinColumn(name = "cityid")
    private City city;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    private String email;
    private Long mobileNo;
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
	public Long getAadharNo() {
		return aadharNo;
	}
	public void setAadharNo(Long aadharNo) {
		this.aadharNo = aadharNo;
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
	public Integer getFid() {
		return fid;
	}
	public void setFid(Integer fid) {
		this.fid = fid;
	}
	public Farmer(String fname, String lname, Long aadharNo, String address, City city, User user, String email,
			Long mobileNo) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.aadharNo = aadharNo;
		this.address = address;
		this.city = city;
		this.user = user;
		this.email = email;
		this.mobileNo = mobileNo;
	}
	public Farmer() {
		super();
	}

    // getters and setters
    
}
