package com.capex.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.UnitDAO;
import com.capex.entity.CapexMaster;
import com.capex.entity.SubDivisionMaster;
import com.capex.entity.UnitLocations;
import com.capex.entity.UnitMaster;
import com.capex.entity.User;

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
		
		User user=userService.getUser(token);
		
		Set<UnitLocations> ul=unit.getUnitLocations();
//		unit.setUnitLocations(ul);
			
		SubDivisionMaster sdm=unit.getSubDivisionMaster();
		unit.setSubDivisionMaster(sdm);
 	
		unitDAO.addUnit(unit);
		
  		updateUnitLocations(ul,unit.getId(),user.getId());

		 
	}

	public void updateUnit(UnitMaster unitUpdate, int token) {
		
		User user=userService.getUser(token);
		UnitMaster unit=unitDAO.getUnit(unitUpdate.getId());
 
		unit.setName(unitUpdate.getName());
  		unitDAO.update(unit);
  		
  		updateUnitLocations(unitUpdate.getUnitLocations(),unitUpdate.getId(),user.getId());
 	}

	private void updateUnitLocations(Set<UnitLocations> unitLocations, int unitId, int userId) {
		for(UnitLocations unitLocation : unitLocations) {
			if(unitLocation.getId()>0) {
				unitDAO.update(unitLocation);
			}else {
				UnitMaster um=unitDAO.getUnit(unitId);
				unitLocation.setUnitMaster(um);
				unitDAO.addUnitLocation(unitLocation);
			}
		}
		
	}

	public boolean deleteUnit(String token, int id) {
		return unitDAO.deleteUnit(id);
	}

	public UnitMaster getUnit(int id) {
 		return unitDAO.getUnit(id);
	}


}
