package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.LocationsDAO;
import com.capex.entity.Locations;

@Service
@Transactional
public class LocationsService {

	@Autowired
	private LocationsDAO locationsDAO;
	
	@Autowired
	private UserService userService;
	
	public List<Locations> getLocations() {
 		return locationsDAO.getLocations();
	}
 
	public void addLocations(Locations locations, int token) {
		 locationsDAO.addLocations(locations);
	}

	public void updateLocations(Locations locations, int token) {
		locationsDAO.updateLocations(locations);
	}

	public boolean deleteLocations(String token, int id) {
		return locationsDAO.deleteLocations(id);
	}

	public Locations getLocations(int id) {
 		return locationsDAO.getLocations(id);
	}

}
