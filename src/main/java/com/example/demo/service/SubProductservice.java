package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummySubProduct;
import com.example.demo.entities.Product;
import com.example.demo.entities.SubProduct;
import com.example.demo.repositries.ProductRepository;
import com.example.demo.repositries.SubProductRepository;

@Service
public class SubProductservice
{
	@Autowired
	SubProductRepository sprepo;
	
	@Autowired
	ProductRepository prepo;
	
	public List<SubProduct>getAll()
	{
		return sprepo.findAll();
	}
	public SubProduct savesp(DummySubProduct dsp)
	{
		int id=dsp.getPid();
		Product p=prepo.findById(id).get();
		SubProduct sp=new SubProduct();
		sp.setProduct(p);
		sp.setSpname(dsp.getSpname());
		return sprepo.save(sp);
	}
	public List<SubProduct>getbyid(int id)
	{
		return sprepo.getbyid(id);
	} 
	public SubProduct deletesp(int spid)
	{
		SubProduct sp=sprepo.findById(spid).get();
		sprepo.deleteById(spid);
		return sp;
	}
}
