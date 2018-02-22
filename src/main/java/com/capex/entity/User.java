package com.capex.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.capex.constants.DatabaseConstants;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@OneToMany(mappedBy = "user",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<CapexMaster> capexMaster;
	
     @Column(name = "hodId")
    private String hodId;

      
    @Column(name = "managerId")
    private String managerId;
    
    

 	public String getHodId() {
		return hodId;
	}

	public void setHodId(String hodId) {
		this.hodId = hodId;
	}

	public String getManagerId() {
		return managerId;
	}

	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

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

	public List<CapexMaster> getCapexMaster() {
		return capexMaster;
	}

	public void setCapexMaster(List<CapexMaster> capexMaster) {
		this.capexMaster = capexMaster;
	}
	
	
 
}
