package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyProductFarmer;
import com.example.demo.entities.DummyUpdateProductFarmer;
import com.example.demo.entities.ProductFarmer;
import com.example.demo.service.ProductFarmerService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductFarmerController
{
	@Autowired
	ProductFarmerService pfserv;
	
	@GetMapping("/getProductFarmer")
	public List<ProductFarmer>getProductfarmers()
	{
		return pfserv.getAll();
	}
	@PostMapping("/saveProductFarmer")
	public ProductFarmer saveProductfarmer(@RequestBody DummyProductFarmer dpf)
	{
		return pfserv.savepf(dpf);
	}
	@GetMapping("/getproductsbyfid")
	public List<ProductFarmer>getProductfarmers(@RequestParam String fid)
	{
		int id=Integer.parseInt(fid);
		return pfserv.getallbyfid(id);
	}
	@DeleteMapping("/deleteProductFarmer")
	public ProductFarmer deleteProductfarmer(@RequestParam String pfid)
	{
		int id=Integer.parseInt(pfid);
		return pfserv.deletepf(id);
	}
	@DeleteMapping("/deletebypfid")
	public ProductFarmer deleteProductfarmerbypfid(@RequestParam String pfid)
	{
		int id=Integer.parseInt(pfid);
		return pfserv.deletepfid(id);
	}
	@PutMapping("/updateproductfarmer/{pfid}")
	public int updateProductFaremer(@PathVariable("pfid") int pfid, @RequestBody DummyUpdateProductFarmer upf)
	{
		return pfserv.updatepf(pfid,upf);
	}
}
