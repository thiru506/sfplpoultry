package com.capex.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.entity.Quarters;
import com.capex.service.QuarterService;

@RestController
@RequestMapping("/quarter")
public class QuarterController {
	
	@Autowired
	private QuarterService service;

	
	@RequestMapping(value={"/update/{token}"},method=RequestMethod.POST)
	public boolean updateQuarter(@RequestBody Quarters quarter,@PathVariable("token") int id) {		
 		service.updateQuarter(quarter);
		return true;
	}

	@RequestMapping(value={"/delete"},method=RequestMethod.POST)
	public boolean deleteQuarter(@RequestBody Quarters quarter) {
 		service.deleteQuarter(quarter);
		return true;
	}


}
