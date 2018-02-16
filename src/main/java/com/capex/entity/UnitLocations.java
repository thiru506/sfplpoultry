package com.capex.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "UnitLocations")
public class UnitLocations {

	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;

	@Column(name = "name")
 	private String name;

 	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="unit")
 	private UnitMaster unitMaster;
 	
 	@ManyToOne
	@JoinColumn(name = "locationsId")
	private Locations locations;
 	
	@ManyToOne
	@JoinColumn(name = "LocationNameId")
	private LocationName locationName;

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

	public UnitMaster getUnitMaster() {
		return unitMaster;
	}

	public void setUnitMaster(UnitMaster unitMaster) {
		this.unitMaster = unitMaster;
	}

	public Locations getLocations() {
		return locations;
	}

	public void setLocations(Locations locations) {
		this.locations = locations;
	}

	public LocationName getLocationName() {
		return locationName;
	}

	public void setLocationName(LocationName locationName) {
		this.locationName = locationName;
	}


	

}
