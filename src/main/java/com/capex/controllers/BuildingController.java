package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.Buildings;
import com.capex.service.BuildingsService;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

	@Autowired
	private BuildingsService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<Buildings> getBuildings() {
 		return service.getBuildings();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatebuildings(@RequestBody Buildings buildings,@PathVariable("token")int token) {
 		service.updateBuildings(buildings,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteBuildings(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteBuildings(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addBuildings(@RequestBody Buildings buildings,@PathVariable("token")int token) {
 		service.addBuildings(buildings,token);
		return true;
	}

	@RequestMapping(value = { "/getBuildings/{token}/{id}" }, method = RequestMethod.GET)
 	public Buildings getBuildings(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getBuildings(id);
 	}


}
