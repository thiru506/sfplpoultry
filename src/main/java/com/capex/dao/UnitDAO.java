package com.capex.dao;

import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.SubDivisionMaster;
import com.capex.entity.UnitLocations;
import com.capex.entity.UnitMaster;

@Repository
@SuppressWarnings("unchecked")
public class UnitDAO extends BaseDAO{

	public List<UnitMaster> getUnits() {
		Criteria criteria=getSession().createCriteria(UnitMaster.class);
		return criteria.list();	}
	
	public void addUnit(UnitMaster unit) {
 
		Set<UnitLocations> ul=unit.getUnitLocations();
		unit.setUnitLocations(ul);
			
		SubDivisionMaster sdm=unit.getSubDivisionMaster();
		unit.setSubDivisionMaster(sdm);
		 
  		save(unit);
  		
 	}

	public void  updateUnit(UnitMaster unit) {
		update(unit);
	}

	public boolean deleteUnit(int id) {
		UnitMaster unit=(UnitMaster) getSession().get(UnitMaster.class, id);;
		delete(unit);
 		return false;
	}
	
	public UnitMaster getUnit(int id) {
		return (UnitMaster) getSession().get(UnitMaster.class, id);
	}



}
