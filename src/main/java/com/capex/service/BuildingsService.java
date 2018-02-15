package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.BuildingsDAO;
import com.capex.entity.Buildings;

@Service
@Transactional
public class BuildingsService {

	@Autowired
	private BuildingsDAO buildingsDAO;
	
	@Autowired
	private UserService userService;
	
	public List<Buildings> getBuildings() {
 		return buildingsDAO.getBuildings();
	}
 
	public void addBuildings(Buildings buildings, int token) {
		 buildingsDAO.addBuildings(buildings);
	}

	public void updateBuildings(Buildings buildings, int token) {
		buildingsDAO.updateBuildings(buildings);
	}

	public boolean deleteBuildings(String token, int id) {
		return buildingsDAO.deleteBuildings(id);
	}

	public Buildings getBuildings(int id) {
 		return buildingsDAO.getBuildings(id);
	}


}
