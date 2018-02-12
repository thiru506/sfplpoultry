package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.DivisionDAO;
import com.capex.entity.DivisionMaster;

@Service
@Transactional
public class DivisionService {
	
	@Autowired
	private DivisionDAO divisionDAO;
	
	@Autowired
	private UserService userService;
	
	public List<DivisionMaster> getDivisions() {
 		return divisionDAO.getDivisions();
	}
 
	public void addDivision(DivisionMaster division, int token) {
		 divisionDAO.addDivision(division);
	}

	public void updateDivision(DivisionMaster division, int token) {
		divisionDAO.updateDivision(division);
	}

	public boolean deleteDivision(String token, int id) {
		return divisionDAO.deleteDivision(id);
	}

	public DivisionMaster getDivision(int id) {
 		return divisionDAO.getDivision(id);
	}



}
