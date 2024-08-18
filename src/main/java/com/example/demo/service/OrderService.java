package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.Order;
import com.example.demo.entities.OrderDetails;
import com.example.demo.entities.ProductFarmer;
import com.example.demo.entities.Wholesaler;
import com.example.demo.repositries.CartRepository;
import com.example.demo.repositries.OrderDetailsRepository;
import com.example.demo.repositries.OrderRepository;
import com.example.demo.repositries.ProductFarmerRepository;
import com.example.demo.repositries.WholesalerRepository;

@Service
public class OrderService 
{
	@Autowired
	OrderRepository orepo;
	
	@Autowired
	CartRepository crepo;
	
	@Autowired
	WholesalerRepository wrepo;
	
	@Autowired
	ProductFarmerRepository pfrepo;
	
	@Autowired
	OrderDetailsRepository odrepo;
	
	public List<Order>getAll()
	{
		return orepo.findAll();
	}
	public Order insertordr(int wid)
	{
		float sum=0;
		List<Cart> c=crepo.findAllById(wid);
		for(Cart c1:c)
		{
			ProductFarmer pf=c1.getProductFarmer();
			float price=(float)pfrepo.getpricebypfid(pf.getPfid());
			int qty=c1.getQuantity();
			sum=sum+((float)price*qty);
		}
		Order o=new Order();
		Wholesaler w=wrepo.findById(wid).get();
		LocalDateTime d=LocalDateTime.now();
		o.setAmount(sum);
		o.setWholesaler(w);
		o.setDatetime(d);
		orepo.save(o);
		for(Cart c2:c) 
		{
			OrderDetails od=new OrderDetails();
			ProductFarmer pf=c2.getProductFarmer();
			float price=(float)pfrepo.getpricebypfid(pf.getPfid());
			int qty=c2.getQuantity();
			od.setProductFarmer(pf);
			od.setAmount(price);
			od.setQuantity(qty);
			pfrepo.updateqty(qty, pf.getPfid());
			od.setOrder(o);
			odrepo.save(od);
		}
		crepo.deletebywid(wid);
		return o;
	}

	public Order deleteordr(int oid)
	{
		Order o=orepo.findById(oid).get();
		orepo.deleteById(oid);
		return o;
	}
	public List<Order> getAllbywid(int wid)
	{
		return orepo.findbywid(wid);
	}
}
