package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.UOM;

@Repository
@SuppressWarnings("unchecked")
public class UOMDAO extends BaseDAO{

	
	public List<UOM> getUOMs() {
		Criteria criteria=getSession().createCriteria(UOM.class);
		return criteria.list();	}
	
	public void addUOM(UOM uom) {
  		save(uom);
	}

	public void  updateUOM(UOM uom) {
		update(uom);
	}

	public boolean deleteUOM(int id) {
		UOM uom=(UOM) getSession().get(UOM.class, id);;
		delete(uom);
 		return false;
	}
	
	public UOM getUOM(int id) {
		return (UOM) getSession().get(UOM.class, id);
	}



}
