package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.CompanyDAO;
import com.capex.entity.CompanyMaster;

 
@Service
@Transactional
public class CompanyService {
	
	@Autowired
	private CompanyDAO companyDAO;
	
	@Autowired
	private UserService userService;
	
	public List<CompanyMaster> getCompanies() {
 		return companyDAO.getCompanies();
	}
 
	public void addCompany(CompanyMaster company, int token) {
		 companyDAO.addCompany(company);
	}

	public void updateCompany(CompanyMaster company, int token) {
		companyDAO.updateCompany(company);
	}

	public boolean deleteCompany(String token, int id) {
		return companyDAO.deleteCompany(id);
	}

	public CompanyMaster getCompany(int id) {
 		return companyDAO.getCompany(id);
	}


}
