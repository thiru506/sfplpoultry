package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.Sheds;

@Repository
@SuppressWarnings("unchecked")
public class ShedsDAO extends BaseDAO{

	public List<Sheds> getSheds() {
		Criteria criteria=getSession().createCriteria(Sheds.class);
		return criteria.list();	}
	
	public void addSheds(Sheds sheds) {
  		save(sheds);
	}

	public void  updateSheds(Sheds sheds) {
		update(sheds);
	}

	public boolean deleteSheds(int id) {
		Sheds sheds=(Sheds) getSession().get(Sheds.class, id);;
		delete(sheds);
 		return false;
	}
	
	public Sheds getSheds(int id) {
		return (Sheds) getSession().get(Sheds.class, id);
	}


}
