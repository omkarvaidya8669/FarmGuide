package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Order;
import com.example.demo.service.OrderService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderController 
{
	@Autowired
	OrderService oserv;
	
	@GetMapping("/getorders")
	public List<Order> getorders()
	{
		return oserv.getAll();
	}
	@PostMapping("/insertorder/{wid}")
	public Order insertOrder(@PathVariable int wid)
	{
		return oserv.insertordr(wid);
	}
	@DeleteMapping("/deleteorder")
	public Order deleteorder(@RequestParam int oid)
	{
		return oserv.deleteordr(oid);
	}
	@GetMapping("/getordersbywid/{wid}")
	public List<Order> getorders(@PathVariable int wid)
	{
		return oserv.getAllbywid(wid);
	}
}
