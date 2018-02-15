package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.Buildings;

@Repository
@SuppressWarnings("unchecked")
public class BuildingsDAO extends BaseDAO{

	public List<Buildings> getBuildings() {
		Criteria criteria=getSession().createCriteria(Buildings.class);
		return criteria.list();	}
	
	public void addBuildings(Buildings buildings) {
  		save(buildings);
	}

	public void  updateBuildings(Buildings buildings) {
		update(buildings);
	}

	public boolean deleteBuildings(int id) {
		Buildings buildings=(Buildings) getSession().get(Buildings.class, id);;
		delete(buildings);
 		return false;
	}
	
	public Buildings getBuildings(int id) {
		return (Buildings) getSession().get(Buildings.class, id);
	}


}
