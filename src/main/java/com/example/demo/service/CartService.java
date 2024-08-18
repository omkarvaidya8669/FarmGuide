package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Cart;
import com.example.demo.entities.DummyCart;
import com.example.demo.entities.ProductFarmer;
import com.example.demo.entities.Wholesaler;
import com.example.demo.repositries.CartRepository;
import com.example.demo.repositries.ProductFarmerRepository;
import com.example.demo.repositries.WholesalerRepository;


@Service
public class CartService
{
	@Autowired
	CartRepository crepo;
	
	@Autowired
	ProductFarmerRepository pfrepo;
	
	@Autowired
	WholesalerRepository wrepo;
	
	public List<Cart> getCartItems()
	{
		return crepo.findAll();
	}

	public Cart Insert(DummyCart dc)
	{
		int pfid=dc.getPfid();
		int wid=dc.getWid();
		ProductFarmer pf=pfrepo.findById(pfid).get();
		Wholesaler w=wrepo.findById(wid).get();
		Cart c=new Cart();
		c.setQuantity(dc.getQuantity());
		c.setProductFarmer(pf);
		c.setWholesaler(w);
		System.out.println(c.toString());
		return crepo.save(c);
	}
	public Cart deletecrt(int cid)
	{
		Cart c=crepo.findById(cid).get();
		crepo.deleteById(cid);
		return c;
	}
}
