package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.SubDivisionDAO;
import com.capex.entity.SubDivisionMaster;

@Service
@Transactional
public class SubDivisionService {

	@Autowired
	private SubDivisionDAO subDivisionDAO;
	
	@Autowired
	private UserService userService;
	
	public List<SubDivisionMaster> getSubDivisions() {
 		return subDivisionDAO.getSubDivisions();
	}
 
	public void addSubDivision(SubDivisionMaster subDivision, int token) {
		 subDivisionDAO.addSubDivision(subDivision);
	}

	public void updateSubDivision(SubDivisionMaster subDivision, int token) {
		subDivisionDAO.updateSubDivision(subDivision);
	}

	public boolean deleteSubDivision(String token, int id) {
		return subDivisionDAO.deleteSubDivision(id);
	}

	public SubDivisionMaster getSubDivision(int id) {
 		return subDivisionDAO.getSubDivision(id);
	}


}
