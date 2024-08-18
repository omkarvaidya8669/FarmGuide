package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.DummyOrderDetails;
import com.example.demo.entities.OrderDetails;
import com.example.demo.service.OrderDetailsService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrderDetailsController
{
	@Autowired
	OrderDetailsService odserv;
	
	@GetMapping("/getallorderdetails")
	public List<OrderDetails>getAllordetails()
	{
		return odserv.getAll();
	}
	@PostMapping("/saveorderdetails")
	public OrderDetails saveorderdet(@RequestBody DummyOrderDetails dod)
	{
		return odserv.saveod(dod);
	}
	@DeleteMapping("/deleteorderdetails")
	public OrderDetails deleteorderdet(@RequestParam int odid)
	{
		return odserv.deleteordetails(odid);
	}
	@GetMapping("/getallorderdetailsbyoid/{oid}")
	public List<OrderDetails>getAllordetailsbyoid(@PathVariable int oid)
	{
		return odserv.getAllbyoid(oid);
	}
	@PostMapping("/getodetailsbyfid/{fid}")
	public List<OrderDetails>getAllbyfid(@PathVariable int fid)
	{
		return odserv.getAllbyfid(fid);
	}
}
