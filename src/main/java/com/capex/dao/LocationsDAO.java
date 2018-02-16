package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.Locations;

@Repository
@SuppressWarnings("unchecked")
public class LocationsDAO extends BaseDAO{

	public List<Locations> getLocations() {
		Criteria criteria=getSession().createCriteria(Locations.class);
		return criteria.list();	}
	
	public void addLocations(Locations locations) {
  		save(locations);
	}

	public void  updateLocations(Locations locations) {
		update(locations);
	}

	public boolean deleteLocations(int id) {
		Locations locations=(Locations) getSession().get(Locations.class, id);;
		delete(locations);
 		return false;
	}
	
	public Locations getLocations(int id) {
		return (Locations) getSession().get(Locations.class, id);
	}


}
