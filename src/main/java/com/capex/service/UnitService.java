package com.capex.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.UnitDAO;
import com.capex.entity.UnitLocations;
import com.capex.entity.UnitMaster;

@Service
@Transactional
public class UnitService {

	@Autowired
	private UnitDAO unitDAO;
	
	@Autowired
	private UserService userService;
	
	public List<UnitMaster> getUnits() {
 		return unitDAO.getUnits();
	}
 
	public void addUnit(UnitMaster unit, int token) {
		 unitDAO.addUnit(unit);
	}

	public void updateUnit(UnitMaster unit, int token) {
		
		Set<UnitLocations> unitLoc=unit.getUnitLocations();
	//	unit.setUnitLocations(unitLoc);
		
		UnitMaster unitUp=unitDAO.getUnit(unit.getId());
		
		unitUp.setUnitLocations(unitLoc);
		
		unitDAO.updateUnit(unitUp);
	}

	public boolean deleteUnit(String token, int id) {
		return unitDAO.deleteUnit(id);
	}

	public UnitMaster getUnit(int id) {
 		return unitDAO.getUnit(id);
	}


}
