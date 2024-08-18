package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Cart;
import com.example.demo.entities.DummyCart;
import com.example.demo.service.CartService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CartController
{
	@Autowired
	CartService cserv;
	
	@GetMapping("/getcart")
	public List<Cart> getCart()
	{
		return cserv.getCartItems();
	}
	
	@PostMapping("/insertincart")
	public Cart insertinCart(@RequestBody DummyCart dc)
	{
		return cserv.Insert(dc);
	}
	@DeleteMapping("/deletecart")
	public Cart deleteCart(@RequestParam int cid)
	{
		return cserv.deletecrt(cid);
	}
	
//	@GetMapping("/getbyid")
//	public Cart getCartById(int wid)
//	{
//		
//	}
}
