package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.core.BusinessException;
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

	public boolean deleteCapex(String token, String id) {
		return capexDAO.deleteCapex(id);
	}

	public CapexMaster getCapex(String id) {
 		return capexDAO.getCapex(id);
	}

	public boolean setApprovalStatus(int token,String id, int status,String remarks) throws BusinessException{
		
		CapexMaster capex=capexDAO.getCapex(id);
		capex.setStatus(status);
		if(status==1) {
			capex.setHodApproveRemarks(remarks);
		}else if(status==2) {
			capex.setManagerApproveRemarks(remarks);
		}else {
			throw new BusinessException("Error in status");
		}
		capexDAO.update(capex);
 		return true;
	}

	public boolean setRejectionStatus(int token,String id, int status,String remarks) throws BusinessException{
		
		CapexMaster capex=capexDAO.getCapex(id);
		capex.setStatus(status);
		if(status==2) {
			capex.setHodRejectRemarks(remarks);
		}else if(status==4) {
			capex.setManagerRejectRemarks(remarks);
		}else {
			throw new BusinessException("Error in status");
		}
		capexDAO.update(capex);
 		return true;
	}
 

}
