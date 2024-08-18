package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Product;
import com.example.demo.repositries.ProductRepository;

@Service
public class ProductService 
{
	@Autowired
	ProductRepository productrepo;
	
	public List<Product>getAll()
	{
		return productrepo.findAll();
	}
	public Product saveProd(Product p)
	{
		return productrepo.save(p);
	}
	public Product DeleteProd(int pid)
	{
		Product p=productrepo.findById(pid).get();
		productrepo.deleteById(pid);
		return p;
	}
	
}
