package com.capex.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "CAPEXBudget")
public class CapexMaster {
	
	@Id
	@GenericGenerator(strategy = "com.capex.entity.CapexIdGenerator", name = "capex_id_generator")
	@GeneratedValue(generator="capex_id_generator")
  	@Column(name = "id", unique = true, nullable = false,updatable = false)
  	private String id;

	@Column(name = "date")
 	private String date;
	
	@ManyToOne
	@JoinColumn(name = "unitId")
	private UnitMaster unitMaster;
	
	@ManyToOne
	@JoinColumn(name = "unitLocationId")
	private UnitLocations unitLocations;
	
  	@LazyCollection(LazyCollectionOption.FALSE)
 	@OneToMany(mappedBy="capexMaster",cascade=CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonManagedReference
  	private Set<Quarters> quarters;
  	
	@Column(name="status",columnDefinition = "int default 0")
	private int status;

	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;

	@ManyToOne
	@JoinColumn(name = "departmentId")
	private Department department;

	
	
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public UnitMaster getUnitMaster() {
		return unitMaster;
	}

	public void setUnitMaster(UnitMaster unitMaster) {
		this.unitMaster = unitMaster;
	}

	public UnitLocations getUnitLocations() {
		return unitLocations;
	}

	public void setUnitLocations(UnitLocations unitLocations) {
		this.unitLocations = unitLocations;
	}

	public Set<Quarters> getQuarters() {
		return quarters;
	}

	public void setQuarters(Set<Quarters> quarters) {
		this.quarters = quarters;
	}	





}
