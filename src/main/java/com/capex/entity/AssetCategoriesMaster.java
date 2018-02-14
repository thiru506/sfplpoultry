package com.capex.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
