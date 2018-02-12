package com.capex.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "CompanyMaster")
public class CompanyMaster {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;
 
	@Column(name = "companyId")
  	private String companyId;
  
	@Column(name = "name")
 	private String name;
  
	@Column(name = "address")
 	private String address;
	
	@OneToMany(mappedBy = "companyMaster",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<DivisionMaster> divisionMaster;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<DivisionMaster> getDivisionMaster() {
		return divisionMaster;
	}

	public void setDivisionMaster(List<DivisionMaster> divisionMaster) {
		this.divisionMaster = divisionMaster;
	}


}
