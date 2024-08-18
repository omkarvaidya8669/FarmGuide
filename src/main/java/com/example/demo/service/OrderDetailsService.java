package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummyOrderDetails;
import com.example.demo.entities.Farmer;
import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.ProductFarmer;
import com.example.demo.repositries.OrderDetailsRepository;
import com.example.demo.repositries.OrderRepository;
import com.example.demo.repositries.ProductFarmerRepository;

@Service
public class OrderDetailsService 
{
	@Autowired
	OrderDetailsRepository odrepo;
	
	@Autowired
	ProductFarmerRepository pfrepo;
	
	@Autowired
	OrderRepository orepo;
	
	public List<OrderDetails>getAll()
	{
		return odrepo.findAll();
	}
	public OrderDetails saveod(DummyOrderDetails dod)
	{
		int pfid=dod.getPfid();
		int oid=dod.getOid();
		OrderDetails od=new OrderDetails();
		od.setOrder(orepo.findById(oid).get());
		od.setProductFarmer(pfrepo.findById(pfid).get());
		od.setAmount(dod.getAmount());
		od.setQuantity(dod.getQuantity());
		return odrepo.save(od);
	}
	public OrderDetails deleteordetails(int odid)
	{
		OrderDetails od=odrepo.findById(odid).get();
		odrepo.deleteById(odid);
		return od;
	}
	public List<OrderDetails>getAllbyoid(int oid)
	{
		return odrepo.getbyoid(oid);
	}
	public List<OrderDetails>getAllbyfid(int fid)
	{
		List<OrderDetails>odl=odrepo.findAll();
		List<OrderDetails>odl1=new ArrayList<OrderDetails>();
		for(OrderDetails o : odl)
		{
			ProductFarmer pf=o.getProductFarmer();
			Farmer f=pf.getFarmer();
			if(f.getFid().equals(fid))
			{
				odl1.add(o);
			}
		}
		return odl1;
	}
}
