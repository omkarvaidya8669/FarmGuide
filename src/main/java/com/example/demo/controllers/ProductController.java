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

import com.example.demo.entities.Product;
import com.example.demo.service.ProductService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController 
{
	@Autowired
	ProductService productservice;
	
	@GetMapping("/getProducts")
	public List<Product>getProducts()
	{
		return productservice.getAll();
	}
	
	@PostMapping("/saveProduct")
	public Product saveProduct(@RequestBody Product p)
	{
		return productservice.saveProd(p);
	}
	
	@DeleteMapping("/deleteProduct")
	public Product DeleteProduct(@RequestParam int pid)
	{
		return productservice.DeleteProd(pid);
	}
	
}
