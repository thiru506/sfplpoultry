package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.StaffQuarters;
import com.capex.service.StaffQuarterService;

@RestController
@RequestMapping("/staffQuarters")
public class StaffQuarterController {

	@Autowired
	private StaffQuarterService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<StaffQuarters> getStaffQuarters() {
 		return service.getStaffQuarters();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updatestaffQuarters(@RequestBody StaffQuarters staffQuarters,@PathVariable("token")int token) {
 		service.updateStaffQuarters(staffQuarters,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteStaffQuarters(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteStaffQuarters(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addStaffQuarters(@RequestBody StaffQuarters staffQuarters,@PathVariable("token")int token) {
 		service.addStaffQuarters(staffQuarters,token);
		return true;
	}

	@RequestMapping(value = { "/getStaffQuarters/{token}/{id}" }, method = RequestMethod.GET)
 	public StaffQuarters getStaffQuarters(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getStaffQuarters(id);
 	}


}
