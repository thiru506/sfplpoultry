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
@Table(name = "AssetCategoriesMaster")
public class AssetCategoriesMaster {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;
 
	@Column(name = "assetCategoriesId")
  	private String assetCategoriesId;
  
	@Column(name = "name")
 	private String name;
	
	@ManyToOne
	@JoinColumn(name = "assetClassId")
	private AssetClassMaster assetClassMaster;
	
	@OneToMany(mappedBy = "assetCategoriesMaster",cascade=CascadeType.ALL)
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

	public String getAssetCategoriesId() {
		return assetCategoriesId;
	}

	public void setAssetCategoriesId(String assetCategoriesId) {
		this.assetCategoriesId = assetCategoriesId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public AssetClassMaster getAssetClassMaster() {
		return assetClassMaster;
	}

	public void setAssetClassMaster(AssetClassMaster assetClassMaster) {
		this.assetClassMaster = assetClassMaster;
	}
	
	


}
