package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.Facilities;

@Repository
@SuppressWarnings("unchecked")
public class FacilitiesDAO extends BaseDAO{

	public List<Facilities> getFacilities() {
		Criteria criteria=getSession().createCriteria(Facilities.class);
		return criteria.list();	}
	
	public void addFacilities(Facilities facilities) {
  		save(facilities);
	}

	public void  updateFacilities(Facilities facilities) {
		update(facilities);
	}

	public boolean deleteFacilities(int id) {
		Facilities facilities=(Facilities) getSession().get(Facilities.class, id);;
		delete(facilities);
 		return false;
	}
	
	public Facilities getFacilities(int id) {
		return (Facilities) getSession().get(Facilities.class, id);
	}


}
