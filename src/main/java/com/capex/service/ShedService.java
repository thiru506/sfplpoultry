package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.ShedsDAO;
import com.capex.entity.Sheds;

@Service
@Transactional
public class ShedService {

	@Autowired
	private ShedsDAO shedsDAO;
	
	@Autowired
	private UserService userService;
	
	public List<Sheds> getSheds() {
 		return shedsDAO.getSheds();
	}
 
	public void addSheds(Sheds sheds, int token) {
		 shedsDAO.addSheds(sheds);
	}

	public void updateSheds(Sheds sheds, int token) {
		shedsDAO.updateSheds(sheds);
	}

	public boolean deleteSheds(String token, int id) {
		return shedsDAO.deleteSheds(id);
	}

	public Sheds getSheds(int id) {
 		return shedsDAO.getSheds(id);
	}

}
