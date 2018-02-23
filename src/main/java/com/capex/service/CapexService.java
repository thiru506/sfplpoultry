package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.CapexDAO;
import com.capex.entity.CapexMaster;

@Service
@Transactional
public class CapexService {

	@Autowired
	private CapexDAO capexDAO;
	
	@Autowired
	private UserService userService;
	
	public List<CapexMaster> getCapexs(int token) {
 		return capexDAO.getCapexs(token);
	}
 
	public void addCapex(CapexMaster capex, int token) {
		 capexDAO.addCapex(capex);
	}

	public void updateCapex(CapexMaster capex, int token) {
		capexDAO.updateCapex(capex);
	}

	public boolean deleteCapex(String token, int id) {
		return capexDAO.deleteCapex(id);
	}

	public CapexMaster getCapex(int id) {
 		return capexDAO.getCapex(id);
	}

	public boolean setApprovalStatus(int token,int id, int status) {
		
		CapexMaster capex=(CapexMaster) capexDAO.getCapexs(id);
		capex.setStatus(status);
		capexDAO.update(capex);
 		return true;
	}

	public boolean setRejectionStatus(int token,int id, int status) {
		
		CapexMaster capex=(CapexMaster) capexDAO.getCapexs(id);
		capex.setStatus(status);
		capexDAO.update(capex);
 		return true;
	}
 

}
