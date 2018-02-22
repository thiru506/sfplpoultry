package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.DepartmentDAO;
import com.capex.entity.Department;

@Service
@Transactional
public class DepartmentService {

	@Autowired
	private DepartmentDAO DepartmentDAO;
	
	@Autowired
	private UserService userService;
	
	public List<Department> getDepartments() {
 		return DepartmentDAO.getDepartments();
	}
 
	public void addDepartment(Department Department, int token) {
		 DepartmentDAO.addDepartment(Department);
	}

	public void updateDepartment(Department Department, int token) {
		DepartmentDAO.updateDepartment(Department);
	}

	public boolean deleteDepartment(String token, int id) {
		return DepartmentDAO.deleteDepartment(id);
	}

	public Department getDepartment(int id) {
 		return DepartmentDAO.getDepartment(id);
	}

}
