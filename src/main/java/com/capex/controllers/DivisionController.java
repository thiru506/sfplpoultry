package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.DivisionMaster;
import com.capex.service.DivisionService;

@RestController
@RequestMapping("/divisions")
public class DivisionController {
	
	@Autowired
	private DivisionService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<DivisionMaster> getDivisions() {
 		return service.getDivisions();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateDivision(@RequestBody DivisionMaster division,@PathVariable("token")int token) {
 		service.updateDivision(division,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteDivision(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteDivision(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addDivision(@RequestBody DivisionMaster division,@PathVariable("token")int token) {
 		service.addDivision(division,token);
		return true;
	}

	@RequestMapping(value = { "/getDivision/{token}/{id}" }, method = RequestMethod.GET)
 	public DivisionMaster getDivision(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getDivision(id);
 	}


}
