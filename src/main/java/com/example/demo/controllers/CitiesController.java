package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.service.CityService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CitiesController 
{
	@Autowired
	CityService cserv;
	
	@GetMapping("/getcities")
	public List<City> getcities()
	{
		return cserv.getAll();
	}
}
