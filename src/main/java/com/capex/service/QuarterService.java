package com.capex.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.QuarterDAO;
import com.capex.entity.Quarters;

@Service
@Transactional
public class QuarterService {

	@Autowired
	private QuarterDAO quarterDAO;
	
	@Autowired
	private UserService userService;

	public void updateQuarter(Quarters quarter) {
		
		Quarters q=quarterDAO.getQuarter(quarter.getId());
		System.out.println(quarter.getId());
 		q.setCost(quarter.getCost());
		q.setDescription(quarter.getDescription());
		q.setJustification(quarter.getJustification());
		q.setQty(quarter.getQty());
		q.setRate(quarter.getRate());
		q.setTax(quarter.getTax());
		q.setTotal(quarter.getTotal());
		quarterDAO.updateQuarter(q);
	}

	public void deleteQuarter(Quarters quarter) {
		quarterDAO.deleteQuarter(quarter);
	}

	
}
