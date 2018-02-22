package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.Department;

@Repository
@SuppressWarnings("unchecked")
public class DepartmentDAO extends BaseDAO{

	public List<Department> getDepartments() {
		Criteria criteria=getSession().createCriteria(Department.class);
		return criteria.list();	}
	
	public void addDepartment(Department Department) {
  		save(Department);
	}

	public void  updateDepartment(Department Department) {
		update(Department);
	}

	public boolean deleteDepartment(int id) {
		Department Department=(Department) getSession().get(Department.class, id);;
		delete(Department);
 		return false;
	}
	
	public Department getDepartment(int id) {
		return (Department) getSession().get(Department.class, id);
	}


}
