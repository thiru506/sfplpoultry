package com.capex.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseDAO {
	@Autowired
	private SessionFactory sessionFactory;
	
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	public void save(Object object){
		getSession().save(object);
	}
	
	public void update(Object object){
		getSession().update(getSession().merge(object));
	}
	
	public void delete(Object object){
		
		getSession().delete(object);
	}
}
