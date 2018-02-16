package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.Locations;
import com.capex.service.LocationsService;

@RestController
@RequestMapping("/locations")
public class LocationsController {

	@Autowired
	private LocationsService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<Locations> getLocations() {
 		return service.getLocations();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatelocations(@RequestBody Locations locations,@PathVariable("token")int token) {
 		service.updateLocations(locations,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteLocations(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteLocations(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addLocations(@RequestBody Locations locations,@PathVariable("token")int token) {
 		service.addLocations(locations,token);
		return true;
	}

	@RequestMapping(value = { "/getLocations/{token}/{id}" }, method = RequestMethod.GET)
 	public Locations getLocations(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getLocations(id);
 	}

}
