package com.capex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.capex.core.BusinessException;
import com.capex.entity.Department;
import com.capex.service.DepartmentService;

@RestController
@RequestMapping("/departments")
public class DepartmentController {
	
	@Autowired
	private DepartmentService service;
	
	@RequestMapping(value = { "/all" }, method = RequestMethod.GET)
 	public List<Department> getDepartments() {
 		return service.getDepartments();
 	}
	@RequestMapping(value="/update/{token}",method=RequestMethod.POST)
	public boolean updateDepartment(@RequestBody Department Department,@PathVariable("token")int token) {
 		service.updateDepartment(Department,token);
		return true;
	}
	
	@RequestMapping(value="/delete/{token}/{id}",method=RequestMethod.POST)
 	public boolean deleteDepartment(@PathVariable("token")String token,@PathVariable("id")int id) throws BusinessException{
 		return service.deleteDepartment(token,id);
	}
	
	@RequestMapping(value="/add/{token}",method=RequestMethod.POST)
	public boolean addDepartment(@RequestBody Department Department,@PathVariable("token")int token) {
 		service.addDepartment(Department,token);
		return true;
	}

	@RequestMapping(value = { "/getDepartment/{token}/{id}" }, method = RequestMethod.GET)
 	public Department getDepartment(@PathVariable("token")int token,@PathVariable("id")int id) {
 		return service.getDepartment(id);
 	}


}
