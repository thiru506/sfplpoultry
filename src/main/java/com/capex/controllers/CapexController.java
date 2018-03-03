package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.CapexMaster;
import com.capex.service.CapexService;

@RestController
@RequestMapping("/capex")
public class CapexController {
	
	@Autowired
	private CapexService service;
	
	@RequestMapping(value = { "/all/{token}" }, method = RequestMethod.GET)
 	public List<CapexMaster> getCapexs(@PathVariable("token")int token) {
 		return service.getCapexs(token);
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateCapex(@RequestBody CapexMaster capex,@PathVariable("token")int token) {
 		service.updateCapex(capex,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteCapex(@PathVariable("token")String token,@PathVariable("id")String id) throws BusinessException{
 		return service.deleteCapex(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addCapex(@RequestBody CapexMaster capex,@PathVariable("token")int token) {
 		service.addCapex(capex,token);
		return true;
	}

	@RequestMapping(value = { "/getCapex/{token}/{id}" }, method = RequestMethod.GET)
 	public CapexMaster getCapex(@PathVariable("token")String token,@PathVariable("id")String id) {
 		return service.getCapex(id);
 	}
	
	@RequestMapping(value = { "/setApprovalStatus/{token}/{id}/{status}" }, method = RequestMethod.POST)
 	public boolean setApprovalStatus(@PathVariable("token")int token,@PathVariable("id")String id,@PathVariable("status")int status) {
 		return service.setApprovalStatus(token,id,status);
 	}

	@RequestMapping(value = { "/setRejectionStatus/{token}/{id}/{status}" }, method = RequestMethod.POST)
 	public boolean setRejectionStatus(@PathVariable("token")int token,@PathVariable("id")String id,@PathVariable("status")int status) {
 		return service.setRejectionStatus(token,id,status);
 	}

}
