package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.HODMaster;

@Repository
@SuppressWarnings("unchecked")
public class HODDAO extends BaseDAO{

	public List<HODMaster> getHODMasters() {
		Criteria criteria=getSession().createCriteria(HODMaster.class);
		return criteria.list();	}
	
	public void addHODMaster(HODMaster hod) {
  		save(hod);
	}

	public void  updateHODMaster(HODMaster hod) {
		update(hod);
	}

	public boolean deleteHODMaster(int id) {
		HODMaster hod=(HODMaster) getSession().get(HODMaster.class, id);;
		delete(hod);
 		return false;
	}
	
	public HODMaster getHODMaster(int id) {
		return (HODMaster) getSession().get(HODMaster.class, id);
	}


}
