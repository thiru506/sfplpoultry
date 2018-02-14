package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.AssetClassMaster;
import com.capex.service.AssetClassService;

@RestController
@RequestMapping("/assetClass")
public class AssetClassController {

	@Autowired
	private AssetClassService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<AssetClassMaster> getAssetClass() {
 		return service.getAssetClass();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateAssetClass(@RequestBody AssetClassMaster assetClass,@PathVariable("token")int token) {
 		service.updateAssetClass(assetClass,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteAssetClass(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteAssetClass(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addAssetClass(@RequestBody AssetClassMaster assetClass,@PathVariable("token")int token) {
 		service.addAssetClass(assetClass,token);
		return true;
	}

	@RequestMapping(value = { "/getAssetClass/{token}/{id}" }, method = RequestMethod.GET)
 	public AssetClassMaster getAssetClass(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getAssetClass(id);
 	}

}
