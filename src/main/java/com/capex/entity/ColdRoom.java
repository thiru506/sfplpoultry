package com.capex.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "ColdRoom")
public class ColdRoom {

	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;

	@Column(name = "name")
 	private String name;
	
 	@ManyToOne
	@JsonBackReference
	@JoinColumn(name="unitLocation")
 	private UnitLocations unitLocations;

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

	public UnitLocations getUnitLocations() {
		return unitLocations;
	}

	public void setUnitLocations(UnitLocations unitLocations) {
		this.unitLocations = unitLocations;
	}

	
}
