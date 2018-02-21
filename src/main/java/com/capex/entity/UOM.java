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
@Table(name = "MeasuringUnits")
public class UOM {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;

	@Column(name = "name")
 	private String name;
	
	@OneToMany(mappedBy = "uom",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Quarters> quarters;


	
	public List<Quarters> getQuarters() {
		return quarters;
	}

	public void setQuarters(List<Quarters> quarters) {
		this.quarters = quarters;
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
	
	
	

}
