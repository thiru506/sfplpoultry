package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.CompanyMaster;
import com.capex.service.CompanyService;
 
@RestController
@RequestMapping("/companies")
public class CompanyController {
	
	@Autowired
	private CompanyService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<CompanyMaster> getCompanies() {
 		return service.getCompanies();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateCompany(@RequestBody CompanyMaster company,@PathVariable("token")int token) {
 		service.updateCompany(company,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteCompany(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteCompany(token,id);
	}
	
	@RequestMapping(value="/addCompany/{token}",method=RequestMethod.POST)
	public boolean addCompany(@RequestBody CompanyMaster company,@PathVariable("token")int token) {
 		service.addCompany(company,token);
		return true;
	}

	@RequestMapping(value = { "/getCompany/{token}/{id}" }, method = RequestMethod.GET)
 	public CompanyMaster getCompany(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getCompany(id);
 	}

}
