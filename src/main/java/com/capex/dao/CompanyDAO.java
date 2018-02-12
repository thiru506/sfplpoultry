package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.CompanyMaster;
 
@Repository
@SuppressWarnings("unchecked")
public class CompanyDAO extends BaseDAO{

	public List<CompanyMaster> getCompanies() {
		Criteria criteria=getSession().createCriteria(CompanyMaster.class);
		return criteria.list();	}
	
	public void addCompany(CompanyMaster company) {
  		save(company);
	}

	public void  updateCompany(CompanyMaster company) {
		update(company);
	}

	public boolean deleteCompany(int id) {
		CompanyMaster company=(CompanyMaster) getSession().get(CompanyMaster.class, id);;
		delete(company);
 		return false;
	}
	
	public CompanyMaster getCompany(int id) {
		return (CompanyMaster) getSession().get(CompanyMaster.class, id);
	}

}
