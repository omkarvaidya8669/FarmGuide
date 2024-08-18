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

import com.example.demo.entities.DummySubProduct;
import com.example.demo.entities.SubProduct;
import com.example.demo.service.SubProductservice;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SubProductController 
{
	@Autowired
	SubProductservice spserv;
	
	@GetMapping("/getSubProducts")
	public List<SubProduct>getSubProducts()
	{
		return spserv.getAll();
	}
	
	@PostMapping("/saveSubProduct")
	public SubProduct saveSubProduct(@RequestBody DummySubProduct dsp)
	{
		return spserv.savesp(dsp);
	}
	@GetMapping("/getsubprobyid")
	public List<SubProduct>getSubProductsbyid(@RequestParam String pid)
	{
		int id=Integer.parseInt(pid);
		return spserv.getbyid(id);
	}
	@DeleteMapping("/deleteSubProduct")
	public SubProduct DeleteSubProduct(@RequestParam int spid)
	{
		return spserv.deletesp(spid);
	}
}
