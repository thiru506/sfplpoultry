package com.capex.dao;

import org.springframework.stereotype.Repository;

import com.capex.entity.Quarters;
import com.capex.entity.User;

@Repository
 public class QuarterDAO extends BaseDAO{
	
	public void updateQuarter(Quarters quarter) {
 		update(quarter);
	}

	public void deleteQuarter(Quarters quarter) {
		delete(quarter);
	}

	public Quarters getQuarter(int id) {
		return (Quarters) getSession().get(Quarters.class, id);	}


}
