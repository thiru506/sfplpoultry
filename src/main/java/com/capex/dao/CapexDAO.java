package com.capex.dao;

import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.CapexMaster;
import com.capex.entity.Department;
import com.capex.entity.Quarters;
import com.capex.entity.UnitLocations;
import com.capex.entity.UnitMaster;
import com.capex.entity.User;

@Repository
@SuppressWarnings("unchecked")
public class CapexDAO extends BaseDAO{

	public List<CapexMaster> getCapexs(int token) {
		Criteria criteria=getSession().createCriteria(CapexMaster.class);
		return criteria.list();	}
	
	public void addCapex(CapexMaster capex) {
		
		Set<Quarters> quar=capex.getQuarters();
		capex.setQuarters(quar);
		
		UnitLocations ul=capex.getUnitLocations();
		capex.setUnitLocations(ul);
		
		UnitMaster um=capex.getUnitMaster();
		capex.setUnitMaster(um);
		
		Department dept=capex.getDepartment();
		capex.setDepartment(dept);
		
		User user=capex.getUser();
		capex.setUser(user);
		
   		save(capex);
  		
 	}

	public void  updateCapex(CapexMaster capex) {
		update(capex);
	}

	public boolean deleteCapex(String id) {
		CapexMaster capex=(CapexMaster) getSession().get(CapexMaster.class, id);;
		delete(capex);
 		return false;
	}
	
	public CapexMaster getCapex(String id) {
		return (CapexMaster) getSession().get(CapexMaster.class, id);
	}

 
}
