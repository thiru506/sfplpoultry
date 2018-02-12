package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.SubDivisionMaster;
import com.capex.service.SubDivisionService;

@RestController
@RequestMapping("/subdivisions")
public class SubDivisionController {

	@Autowired
	private SubDivisionService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<SubDivisionMaster> getSubDivisions() {
 		return service.getSubDivisions();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateSubDivision(@RequestBody SubDivisionMaster subDivision,@PathVariable("token")int token) {
 		service.updateSubDivision(subDivision,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteSubDivision(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteSubDivision(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addSubDivision(@RequestBody SubDivisionMaster subDivision,@PathVariable("token")int token) {
 		service.addSubDivision(subDivision,token);
		return true;
	}

	@RequestMapping(value = { "/getSubDivision/{token}/{id}" }, method = RequestMethod.GET)
 	public SubDivisionMaster getSubDivision(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getSubDivision(id);
 	}

}
