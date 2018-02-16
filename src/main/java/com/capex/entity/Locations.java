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
@Table(name = "Locations")
public class Locations {

	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;

	@Column(name = "name")
 	private String name;
	
	@OneToMany(mappedBy = "locations",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<UnitLocations> unitLocations;

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

	public List<UnitLocations> getUnitLocations() {
		return unitLocations;
	}

	public void setUnitLocations(List<UnitLocations> unitLocations) {
		this.unitLocations = unitLocations;
	}
	
	

}
