package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.capex.entity.User;

@Repository
public class UserDAO extends BaseDAO {

	public User getUser(int userid) {
		return (User) getSession().get(User.class, userid);
	}

	public User getUserByEmail(String email) {

		Criteria criteria = getSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("email", email));
		User user = (User) criteria.uniqueResult();

		return user;
	}

	public User getUserByPhone(String phone) {
		Criteria criteria = getSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("phone", phone));
		return (User) criteria.uniqueResult();
	}

	@SuppressWarnings("unchecked")
	public List<User> getAll() {
		Criteria criteria = getSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("status", true));
		return criteria.list();
	}
 

}
