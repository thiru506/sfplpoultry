package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.Facilities;
import com.capex.service.FacilitiesService;

@RestController
@RequestMapping("/facilities")
public class FacilityController {

	@Autowired
	private FacilitiesService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<Facilities> getFacilities() {
 		return service.getFacilities();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatefacilities(@RequestBody Facilities facilities,@PathVariable("token")int token) {
 		service.updateFacilities(facilities,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteFacilities(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteFacilities(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addFacilities(@RequestBody Facilities facilities,@PathVariable("token")int token) {
 		service.addFacilities(facilities,token);
		return true;
	}

	@RequestMapping(value = { "/getFacilities/{token}/{id}" }, method = RequestMethod.GET)
 	public Facilities getFacilities(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getFacilities(id);
 	}

}
