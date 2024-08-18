package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.repositries.CityRepository;

@Service
public class CityService 
{
	@Autowired
	CityRepository crepo;
	
	public List<City>getAll()
	{
		return crepo.findAll();
	}
}
