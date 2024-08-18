package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DummyProductFarmer;
import com.example.demo.entities.DummyUpdateProductFarmer;
import com.example.demo.entities.Farmer;
import com.example.demo.entities.Product;
import com.example.demo.entities.ProductFarmer;
import com.example.demo.entities.SubProduct;
import com.example.demo.repositries.FarmerRepository;
import com.example.demo.repositries.ProductFarmerRepository;
import com.example.demo.repositries.ProductRepository;
import com.example.demo.repositries.SubProductRepository;


@Service
public class ProductFarmerService 
{
	@Autowired
	ProductFarmerRepository pfrepo;
	
	@Autowired
	SubProductRepository sprepo;
	
	@Autowired
	ProductRepository prepo;
	
	@Autowired
	FarmerRepository frepo;
	
	
	public List<ProductFarmer>getAll()
	{
		return pfrepo.findAll();
	}
	public ProductFarmer savepf(DummyProductFarmer dpf)
	{
		int pid=dpf.getPid();
		Integer spid=dpf.getSpid();
		int fid=dpf.getFid();
		Product p=prepo.findById(pid).get();
		SubProduct sp=sprepo.findById(spid).get();
		Farmer f=frepo.findById(fid).get();
		ProductFarmer pf=new ProductFarmer();
		pf.setFarmer(f);
		pf.setSubProduct(sp);
		pf.setProduct(p);
		pf.setQuantity(dpf.getQuantity());
		pf.setPrice(dpf.getPrice());
		return pfrepo.save(pf);
	}
	public ProductFarmer deletepf(int pfid)
	{
		ProductFarmer pf=pfrepo.findById(pfid).get();
		pfrepo.deleteById(pfid);
		return pf;
	}
	public List<ProductFarmer>getallbyfid(int fid)
	{
		return pfrepo.getbyfid(fid);
	}
	public ProductFarmer deletepfid(int pfid)
	{
		ProductFarmer pf=pfrepo.findById(pfid).get();
		pfrepo.deleteById(pfid);
		return pf;
	}
	public int updatepf(int pfid,DummyUpdateProductFarmer upf)
	{
		if(pfrepo.updatepfrmr(pfid,upf.getPrice(),upf.getQuantity())>0)
				return 1;
		return 0;	
	}
}
