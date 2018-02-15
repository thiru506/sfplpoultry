package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.Sheds;
import com.capex.service.ShedService;

@RestController
@RequestMapping("/sheds")
public class ShedsController {
	
	@Autowired
	private ShedService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<Sheds> getSheds() {
 		return service.getSheds();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatesheds(@RequestBody Sheds sheds,@PathVariable("token")int token) {
 		service.updateSheds(sheds,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteSheds(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteSheds(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addSheds(@RequestBody Sheds sheds,@PathVariable("token")int token) {
 		service.addSheds(sheds,token);
		return true;
	}

	@RequestMapping(value = { "/getSheds/{token}/{id}" }, method = RequestMethod.GET)
 	public Sheds getSheds(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getSheds(id);
 	}


}
