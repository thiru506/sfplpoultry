package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.LocationName;
import com.capex.service.LocationNameService;

@RestController
@RequestMapping("/locationName")
public class LocationNameController {

	@Autowired
	private LocationNameService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<LocationName> getLocationNames() {
 		return service.getLocationNames();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatelocationName(@RequestBody LocationName locationName,@PathVariable("token")int token) {
 		service.updateLocationName(locationName,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteLocationName(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteLocationName(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addLocationName(@RequestBody LocationName locationName,@PathVariable("token")int token) {
 		service.addLocationName(locationName,token);
		return true;
	}

	@RequestMapping(value = { "/getLocationName/{token}/{id}" }, method = RequestMethod.GET)
 	public LocationName getLocationName(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getLocationName(id);
 	}


}
