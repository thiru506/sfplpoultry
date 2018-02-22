package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.HODDAO;
import com.capex.entity.HODMaster;

@Service
@Transactional
public class HODService {

	@Autowired
	private HODDAO hodDAO;
	
	@Autowired
	private UserService userService;
	
	public List<HODMaster> getHODMasters() {
 		return hodDAO.getHODMasters();
	}
 
	public void addHODMaster(HODMaster hod, int token) {
		 hodDAO.addHODMaster(hod);
	}

	public void updateHODMaster(HODMaster hod, int token) {
		hodDAO.updateHODMaster(hod);
	}

	public boolean deleteHODMaster(String token, int id) {
		return hodDAO.deleteHODMaster(id);
	}

	public HODMaster getHODMaster(int id) {
 		return hodDAO.getHODMaster(id);
	}


}
