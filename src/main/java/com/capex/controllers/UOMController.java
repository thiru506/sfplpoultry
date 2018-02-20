package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.UOM;
import com.capex.service.UOMService;

@RestController
@RequestMapping("/uom")
public class UOMController {

	@Autowired
	private UOMService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<UOM> getUOMs() {
 		return service.getUOMs();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateUOM(@RequestBody UOM uom,@PathVariable("token")int token) {
 		service.updateUOM(uom,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteUOM(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteUOM(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addUOM(@RequestBody UOM uom,@PathVariable("token")int token) {
 		service.addUOM(uom,token);
		return true;
	}

	@RequestMapping(value = { "/getUOM/{token}/{id}" }, method = RequestMethod.GET)
 	public UOM getUOM(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getUOM(id);
 	}

}
