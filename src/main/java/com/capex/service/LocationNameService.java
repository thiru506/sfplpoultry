package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.LocationNameDAO;
import com.capex.entity.LocationName;

@Service
@Transactional
public class LocationNameService {

	@Autowired
	private LocationNameDAO locationNameDAO;
	
	@Autowired
	private UserService userService;
	
	public List<LocationName> getLocationNames() {
 		return locationNameDAO.getLocationNames();
	}
 
	public void addLocationName(LocationName locationName, int token) {
		 locationNameDAO.addLocationName(locationName);
	}

	public void updateLocationName(LocationName locationName, int token) {
		locationNameDAO.updateLocationName(locationName);
	}

	public boolean deleteLocationName(String token, int id) {
		return locationNameDAO.deleteLocationName(id);
	}

	public LocationName getLocationName(int id) {
 		return locationNameDAO.getLocationName(id);
	}

}
