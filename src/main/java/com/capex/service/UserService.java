package com.capex.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.core.BusinessException;
import com.capex.dao.UserDAO;
import com.capex.entity.AuditInfo;
import com.capex.entity.Department;
import com.capex.entity.User;
import com.capex.util.ValidationUtil;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserDAO userDAO;

	public User loginUser(User user) throws BusinessException {
		/** Check Email is Entered or Not */
		if (user.getEmail() == null || user.getEmail().isEmpty()) {
			throw new BusinessException("Email Address is Mandatory");
		}

		if (user.getPassword() == null || user.getPassword().isEmpty()) {
			throw new BusinessException("Password is Mandatory");
		}

		User dbUser = userDAO.getUserByEmail(user.getEmail());
		if (dbUser == null) {
			throw new BusinessException("Invalid UserId");
		} else {
			if (!dbUser.getPassword().equals(encrypt(user.getPassword()))) {
				throw new BusinessException("Invalid Password");
			}
		}
		return dbUser;
	}

	public void addUser(User user, String token) throws BusinessException {

		/** Get user based on the authentication token and validate the role */
		int userid = getUser(token);
	//	validateRole(userid);

		user.setStatus(true);

		/** Check Email is Entered or Not */
		if (user.getEmail() == null || user.getEmail().isEmpty()) {
			throw new BusinessException("Email Address is Mandatory");
		}

		/** Check Phone is Entered or Not */
		if (user.getPhone() == null || user.getPhone().isEmpty()) {
			throw new BusinessException("Phone Number is Mandatory");
		}
		ValidationUtil.isEmailValid(user.getEmail(), "Invalid Email Address");
		if (!ValidationUtil.validatePhoneNumber(user.getPhone())) {
			throw new BusinessException("Invalid Phone Number");
		}

		/** Check for email duplication */
		User dbUser = userDAO.getUserByEmail(user.getEmail());
		if (dbUser != null) {
			throw new BusinessException("User with same email exists");
		}

//		/** Check for phone duplication */
//		dbUser = userDAO.getUserByPhone(user.getPhone());
//		if (dbUser != null) {
//			throw new BusinessException("User with same Phone number exists");
//		}
		
 
		user.setPassword(encrypt(user.getPassword()));

		/** Initialize Audit Information */
		user.setAuditInfo(AuditInfo.getInstance(userid));
		
		User h=user.getHodId();
		user.setHodId(h);
		
		User m=user.getManagerId();
		user.setManagerId(m);
		
		Department d=user.getDepartment();
		user.setDepartment(d);
 		
		userDAO.save(user);

		/**
		 * Setting userid as OAuth Token can be modified later based on the
		 * algorithm we use
		 */
 		userDAO.update(user);

	}

	public int getUser(String token) {
		return Integer.parseInt(token);
	}
	
	public User getUserLog(String email) throws BusinessException{
		
		User user=getUserByEmail(email);
		return user;
	}

	public void validateRole(int userid) throws BusinessException{
		User user=getUser(userid);
		if(user.getUserType()==1)
			throw new BusinessException("User has no previlages for this control");
	}

	public User getUser(int id) {
		return userDAO.getUser(id);
	}

	public List<User> getAll(int token) throws BusinessException{
		/** Get user based on the authentication token and validate the role */
///		User user = getUser(token);
		validateRole(token);
//		User user = getUser(userid);
		
 			return userDAO.getAll();
 	}


	public void updateUser(User user, int token) throws BusinessException {
		/** Get user based on the authentication token and validate the role */

		int userid = token;
//		validateRole(userid);
			System.out.println(userid);
		User dbUser = userDAO.getUser(user.getId());
		System.out.println(dbUser.getId());
//		if (dbUser == null) {
//			throw new BusinessException("User Not available");
//		}

		dbUser.setEmail(user.getEmail());
		dbUser.setPhone(user.getPhone());
		dbUser.setName(user.getName());
 		dbUser.setUserType(user.getUserType());
  		dbUser.setStatus(user.isStatus());

		if (user.getPassword() != null && !user.getPassword().isEmpty()) {
			dbUser.setPassword(encrypt(user.getPassword()));
		}

	//	dbUser.getAuditInfo().setUpdatedBy(userid);
//		dbUser.getAuditInfo().setUpdatedOn(new Date());

		userDAO.update(dbUser);

	}

	public boolean updatePassword(String token, String oldpass, String newpass) throws BusinessException {
		/** Get user based on the authentication token and validate the role */
		int userid = getUser(token);
		validateRole(userid);

		User dbUser = userDAO.getUser(userid);
		if (dbUser == null) {
			throw new BusinessException("User Not available");
		}

		if (!encrypt(oldpass).equals(dbUser.getPassword())) {
			throw new BusinessException("Password Not Matching");
		}
		dbUser.setPassword(encrypt(newpass));

		dbUser.getAuditInfo().setUpdatedBy(userid);
		dbUser.getAuditInfo().setUpdatedOn(new Date());

		userDAO.update(dbUser);
		return true;
	}

	public static String encrypt(String password) {

		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(password);
	}
 
	public boolean deleteUser(String token, int id) {

		int userid = getUser(token);
	//	validateRole(userid);
		User user = userDAO.getUser(id);
		user.setStatus(false);
		user.getAuditInfo().setUpdatedBy(userid);
		user.getAuditInfo().setUpdatedOn(new Date());
		userDAO.update(user);

		return false;
	}
	
	public boolean deleteUserTotal(int token, int id) {
		System.out.println("deleteUserTotal");
	//	validateRole(userid);
		User user = userDAO.getUser(id);
		userDAO.delete(user);

		return true;
	}

	public boolean resetPassword(String token, int user, String newpass) {
		int userid = getUser(token);
	//	validateRole(userid);
		User dbuser = userDAO.getUser(user);
		dbuser.setPassword(encrypt(newpass));
		dbuser.getAuditInfo().setUpdatedBy(userid);
		dbuser.getAuditInfo().setUpdatedOn(new Date());
		userDAO.update(dbuser);
		return true;
	}

	public User getUser(String token, int id) {
		int userid = getUser(token);
	//	validateRole(userid);
		User user = userDAO.getUser(id);
		return user;
	}

	public User getUserByEmail(String userId) throws BusinessException {
		User user = userDAO.getUserByEmail(userId);
		if (user == null) {
			throw new BusinessException("Invalid Login");
		}
		
		return user;
	}
  
	public boolean changePassword(int id, String oldpassword, String newpassword) throws BusinessException {
 
		User dbUser = userDAO.getUser(id);
		if (dbUser == null) {
			throw new BusinessException("User Not available");
		}

		if (BCrypt.checkpw(oldpassword, dbUser.getPassword())) {
			dbUser.setPassword(encrypt(newpassword));
		//	dbUser.getAuditInfo().setUpdatedBy(id);
		//	dbUser.getAuditInfo().setUpdatedOn(new Date());
			userDAO.update(dbUser);
		} else {
			throw new BusinessException("Password's Not Matching");
		}
		return true;
	}
	
	
}
