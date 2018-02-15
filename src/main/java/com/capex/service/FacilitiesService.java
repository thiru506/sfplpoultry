package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.FacilitiesDAO;
import com.capex.entity.Facilities;

@Service
@Transactional
public class FacilitiesService {

	@Autowired
	private FacilitiesDAO facilitiesDAO;
	
	@Autowired
	private UserService userService;
	
	public List<Facilities> getFacilities() {
 		return facilitiesDAO.getFacilities();
	}
 
	public void addFacilities(Facilities facilities, int token) {
		 facilitiesDAO.addFacilities(facilities);
	}

	public void updateFacilities(Facilities facilities, int token) {
		facilitiesDAO.updateFacilities(facilities);
	}

	public boolean deleteFacilities(String token, int id) {
		return facilitiesDAO.deleteFacilities(id);
	}

	public Facilities getFacilities(int id) {
 		return facilitiesDAO.getFacilities(id);
	}

}
