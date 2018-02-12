package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.SubDivisionMaster;

@Repository
@SuppressWarnings("unchecked")
public class SubDivisionDAO extends BaseDAO{

	public List<SubDivisionMaster> getSubDivisions() {
		Criteria criteria=getSession().createCriteria(SubDivisionMaster.class);
		return criteria.list();	}
	
	public void addSubDivision(SubDivisionMaster subDivision) {
  		save(subDivision);
	}

	public void  updateSubDivision(SubDivisionMaster subDivision) {
		update(subDivision);
	}

	public boolean deleteSubDivision(int id) {
		SubDivisionMaster subDivision=(SubDivisionMaster) getSession().get(SubDivisionMaster.class, id);;
		delete(subDivision);
 		return false;
	}
	
	public SubDivisionMaster getSubDivision(int id) {
		return (SubDivisionMaster) getSession().get(SubDivisionMaster.class, id);
	}


}
