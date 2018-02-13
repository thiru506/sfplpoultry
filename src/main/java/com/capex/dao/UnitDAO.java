package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.UnitMaster;

@Repository
@SuppressWarnings("unchecked")
public class UnitDAO extends BaseDAO{

	public List<UnitMaster> getUnits() {
		Criteria criteria=getSession().createCriteria(UnitMaster.class);
		return criteria.list();	}
	
	public void addUnit(UnitMaster unit) {
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
