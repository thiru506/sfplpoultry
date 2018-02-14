package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.AssetCategoriesMaster;
import com.capex.service.AssetCategoriesService;

@RestController
@RequestMapping("/assetCategories")
public class AssetCategoriesController {

	@Autowired
	private AssetCategoriesService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<AssetCategoriesMaster> getAssetCategories() {
 		return service.getAssetCategories();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateAssetCategories(@RequestBody AssetCategoriesMaster assetCategories,@PathVariable("token")int token) {
 		service.updateAssetCategories(assetCategories,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteAssetCategories(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteAssetCategories(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addAssetCategories(@RequestBody AssetCategoriesMaster assetCategories,@PathVariable("token")int token) {
 		service.addAssetCategories(assetCategories,token);
		return true;
	}

	@RequestMapping(value = { "/getAssetCategories/{token}/{id}" }, method = RequestMethod.GET)
 	public AssetCategoriesMaster getAssetCategories(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getAssetCategories(id);
 	}

}
