package com.capex.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "DivisionMaster")
public class DivisionMaster {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;
 
	@Column(name = "divisionId")
  	private String divisionId;
  
	@Column(name = "name")
 	private String name;

	@ManyToOne
	@JoinColumn(name = "companyId")
	private CompanyMaster companyMaster;
	
	@OneToMany(mappedBy = "divisionMaster",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<SubDivisionMaster> subDivisionMaster;
	

	public List<SubDivisionMaster> getSubDivisionMaster() {
		return subDivisionMaster;
	}

	public void setSubDivisionMaster(List<SubDivisionMaster> subDivisionMaster) {
		this.subDivisionMaster = subDivisionMaster;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDivisionId() {
		return divisionId;
	}

	public void setDivisionId(String divisionId) {
		this.divisionId = divisionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyMaster getCompanyMaster() {
		return companyMaster;
	}

	public void setCompanyMaster(CompanyMaster companyMaster) {
		this.companyMaster = companyMaster;
	}



}
