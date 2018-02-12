package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.DivisionMaster;

@Repository
@SuppressWarnings("unchecked")
public class DivisionDAO extends BaseDAO{

	public List<DivisionMaster> getDivisions() {
		Criteria criteria=getSession().createCriteria(DivisionMaster.class);
		return criteria.list();	}
	
	public void addDivision(DivisionMaster division) {
  		save(division);
	}

	public void  updateDivision(DivisionMaster division) {
		update(division);
	}

	public boolean deleteDivision(int id) {
		DivisionMaster division=(DivisionMaster) getSession().get(DivisionMaster.class, id);;
		delete(division);
 		return false;
	}
	
	public DivisionMaster getDivision(int id) {
		return (DivisionMaster) getSession().get(DivisionMaster.class, id);
	}


}
