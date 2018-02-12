package com.capex.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "SubDivisionMaster")
public class SubDivisionMaster {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;
 
	@Column(name = "subDivisionId")
  	private String subDivisionId;
  
	@Column(name = "name")
 	private String name;
	
	@ManyToOne
	@JoinColumn(name = "divisionId")
	private DivisionMaster divisionMaster;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSubDivisionId() {
		return subDivisionId;
	}

	public void setSubDivisionId(String subDivisionId) {
		this.subDivisionId = subDivisionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public DivisionMaster getDivisionMaster() {
		return divisionMaster;
	}

	public void setDivisionMaster(DivisionMaster divisionMaster) {
		this.divisionMaster = divisionMaster;
	}


}
