package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.StaffQuartersDAO;
import com.capex.entity.StaffQuarters;


@Service
@Transactional
public class StaffQuarterService {

	
	@Autowired
	private StaffQuartersDAO staffQuartersDAO;
	
	@Autowired
	private UserService userService;
	
	public List<StaffQuarters> getStaffQuarters() {
 		return staffQuartersDAO.getStaffQuarters();
	}
 
	public void addStaffQuarters(StaffQuarters staffQuarters, int token) {
		 staffQuartersDAO.addStaffQuarters(staffQuarters);
	}

	public void updateStaffQuarters(StaffQuarters staffQuarters, int token) {
		staffQuartersDAO.updateStaffQuarters(staffQuarters);
	}

	public boolean deleteStaffQuarters(String token, int id) {
		return staffQuartersDAO.deleteStaffQuarters(id);
	}

	public StaffQuarters getStaffQuarters(int id) {
 		return staffQuartersDAO.getStaffQuarters(id);
	}

}
