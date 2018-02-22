package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.HODMaster;
import com.capex.service.HODService;

@RestController
@RequestMapping("/hods")
public class HODController {

	@Autowired
	private HODService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<HODMaster> getHODMasters() {
 		return service.getHODMasters();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateHODMaster(@RequestBody HODMaster hod,@PathVariable("token")int token) {
 		service.updateHODMaster(hod,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteHODMaster(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteHODMaster(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addHODMaster(@RequestBody HODMaster hod,@PathVariable("token")int token) {
 		service.addHODMaster(hod,token);
		return true;
	}

	@RequestMapping(value = { "/getHODMaster/{token}/{id}" }, method = RequestMethod.GET)
 	public HODMaster getHODMaster(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getHODMaster(id);
 	}

}
