package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.StaffQuarters;


@Repository
@SuppressWarnings("unchecked")
public class StaffQuartersDAO extends BaseDAO{

	public List<StaffQuarters> getStaffQuarters() {
		Criteria criteria=getSession().createCriteria(StaffQuarters.class);
		return criteria.list();	}
	
	public void addStaffQuarters(StaffQuarters staffQuarters) {
  		save(staffQuarters);
	}

	public void  updateStaffQuarters(StaffQuarters staffQuarters) {
		update(staffQuarters);
	}

	public boolean deleteStaffQuarters(int id) {
		StaffQuarters staffQuarters=(StaffQuarters) getSession().get(StaffQuarters.class, id);;
		delete(staffQuarters);
 		return false;
	}
	
	public StaffQuarters getStaffQuarters(int id) {
		return (StaffQuarters) getSession().get(StaffQuarters.class, id);
	}


}
