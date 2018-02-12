package com.capex.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.capex.constants.DatabaseConstants;

@Entity
@Table(name = "Users")
public class User {
 
	@Id
 	@GeneratedValue
  	@Column(name = DatabaseConstants.COL_USER_ID, unique = true, nullable = false)
  	private int id;
 
	@Column(name = DatabaseConstants.COL_USER_NAME)
  	private String name;
  
	@Column(name = DatabaseConstants.COL_USER_EMAIL)
 	private String email;
  
	@Column(name = DatabaseConstants.COL_USER_PHONE)
 	private String phone;
  
	@Column(name = DatabaseConstants.COL_USER_PASSWORD)
 	private String password;
	
	@Column(name="status",columnDefinition = "boolean default 1")
	private boolean status;
 
	@Embedded
 	private AuditInfo auditInfo;
	
	@Column(name = "TYPE")
	private int userType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public AuditInfo getAuditInfo() {
		return auditInfo;
	}

	public void setAuditInfo(AuditInfo auditInfo) {
		this.auditInfo = auditInfo;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}
 
}
