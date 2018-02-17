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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "UnitMaster")
public class UnitMaster {

	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;
 
	@Column(name = "name")
 	private String name;
	
	@ManyToOne
	@JoinColumn(name = "subDivisionId")
	private SubDivisionMaster subDivisionMaster;
	
  	@LazyCollection(LazyCollectionOption.FALSE)
 	@OneToMany(mappedBy="unitMaster",cascade=CascadeType.ALL,fetch = FetchType.LAZY)
	@JsonManagedReference
  	private Set<UnitLocations> unitLocations;

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

	public Set<UnitLocations> getUnitLocations() {
		return unitLocations;
	}

	public void setUnitLocations(Set<UnitLocations> unitLocations) {
		this.unitLocations = unitLocations;
	}

	public SubDivisionMaster getSubDivisionMaster() {
		return subDivisionMaster;
	}

	public void setSubDivisionMaster(SubDivisionMaster subDivisionMaster) {
		this.subDivisionMaster = subDivisionMaster;
	}	
  
	
	
}
