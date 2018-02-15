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
	@JoinColumn(name = "shedId")
	private Sheds sheds;

	@ManyToOne
	@JoinColumn(name = "staffQuartersId")
	private StaffQuarters staffQuarters;
	
	@ManyToOne
	@JoinColumn(name = "buildingsId")
	private Buildings buildings;
	
	@ManyToOne
	@JoinColumn(name = "facilitiesId")
	private Facilities facilities;
	
	@ManyToOne
	@JoinColumn(name = "coldRoomId")
	private Sheds coldRoom;

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

	public Sheds getSheds() {
		return sheds;
	}

	public void setSheds(Sheds sheds) {
		this.sheds = sheds;
	}

	public StaffQuarters getStaffQuarters() {
		return staffQuarters;
	}

	public void setStaffQuarters(StaffQuarters staffQuarters) {
		this.staffQuarters = staffQuarters;
	}

	public Buildings getBuildings() {
		return buildings;
	}

	public void setBuildings(Buildings buildings) {
		this.buildings = buildings;
	}

	public Facilities getFacilities() {
		return facilities;
	}

	public void setFacilities(Facilities facilities) {
		this.facilities = facilities;
	}

	public Sheds getColdRoom() {
		return coldRoom;
	}

	public void setColdRoom(Sheds coldRoom) {
		this.coldRoom = coldRoom;
	}

	
}
