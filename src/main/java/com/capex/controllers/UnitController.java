package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.UnitMaster;
import com.capex.service.UnitService;

@RestController
@RequestMapping("/units")
public class UnitController {

	@Autowired
	private UnitService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<UnitMaster> getUnits() {
 		return service.getUnits();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateUnit(@RequestBody UnitMaster unit,@PathVariable("token")int token) {
 		service.updateUnit(unit,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteUnit(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteUnit(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addUnit(@RequestBody UnitMaster unit,@PathVariable("token")int token) {
 		service.addUnit(unit,token);
		return true;
	}

	@RequestMapping(value = { "/getUnit/{token}/{id}" }, method = RequestMethod.GET)
 	public UnitMaster getUnit(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getUnit(id);
 	}

}
