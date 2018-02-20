package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.UOMDAO;
import com.capex.entity.UOM;

@Service
@Transactional
public class UOMService {

	
	@Autowired
	private UOMDAO uomDAO;
	
	@Autowired
	private UserService userService;
	
	public List<UOM> getUOMs() {
 		return uomDAO.getUOMs();
	}
 
	public void addUOM(UOM uom, int token) {
		 uomDAO.addUOM(uom);
	}

	public void updateUOM(UOM uom, int token) {
		uomDAO.updateUOM(uom);
	}

	public boolean deleteUOM(String token, int id) {
		return uomDAO.deleteUOM(id);
	}

	public UOM getUOM(int id) {
 		return uomDAO.getUOM(id);
	}

}
