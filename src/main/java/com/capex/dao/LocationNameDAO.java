package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.LocationName;

@Repository
@SuppressWarnings("unchecked")
public class LocationNameDAO extends BaseDAO{

	public List<LocationName> getLocationNames() {
		Criteria criteria=getSession().createCriteria(LocationName.class);
		return criteria.list();	}
	
	public void addLocationName(LocationName locationName) {
  		save(locationName);
	}

	public void  updateLocationName(LocationName locationName) {
		update(locationName);
	}

	public boolean deleteLocationName(int id) {
		LocationName locationName=(LocationName) getSession().get(LocationName.class, id);;
		delete(locationName);
 		return false;
	}
	
	public LocationName getLocationName(int id) {
		return (LocationName) getSession().get(LocationName.class, id);
	}


}
