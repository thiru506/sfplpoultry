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
@Table(name = "Quarters")
public class Quarters {
	
	@Id
 	@GeneratedValue
  	@Column(name = "id", unique = true, nullable = false)
  	private int id;

	@Column(name = "cost")
 	private String cost;

	@Column(name = "qty")
 	private String qty;
	
	@Column(name = "year")
 	private String year;

	@Column(name = "quarter")
 	private String quarter;

	@Column(name = "rate")
 	private String rate;

	@Column(name = "tax")
 	private String tax;

	@Column(name = "total")
 	private String total;
	
	@Column(name = "description")
 	private String description;

	@Column(name = "justification")
 	private String justification;

	
	@ManyToOne
	@JoinColumn(name = "assetCategoriesId")
	private AssetCategoriesMaster assetCategoriesMaster;

	@ManyToOne
	@JoinColumn(name = "assetClassId")
	private AssetClassMaster assetClassMaster;
	
  	@ManyToOne
	@JsonBackReference
 	@JoinColumn(name="capexBudgetId")
  	private CapexMaster capexMaster;

	@ManyToOne
	@JoinColumn(name = "uomId")
	private UOM uom;
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getJustification() {
		return justification;
	}

	public void setJustification(String justification) {
		this.justification = justification;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public CapexMaster getCapexMaster() {
		return capexMaster;
	}

	public void setCapexMaster(CapexMaster capexMaster) {
		this.capexMaster = capexMaster;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getQuarter() {
		return quarter;
	}

	public void setQuarter(String quarter) {
		this.quarter = quarter;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getTax() {
		return tax;
	}

	public void setTax(String tax) {
		this.tax = tax;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public AssetCategoriesMaster getAssetCategoriesMaster() {
		return assetCategoriesMaster;
	}

	public void setAssetCategoriesMaster(AssetCategoriesMaster assetCategoriesMaster) {
		this.assetCategoriesMaster = assetCategoriesMaster;
	}

	public AssetClassMaster getAssetClassMaster() {
		return assetClassMaster;
	}

	public void setAssetClassMaster(AssetClassMaster assetClassMaster) {
		this.assetClassMaster = assetClassMaster;
	}

	public UOM getUom() {
		return uom;
	}

	public void setUom(UOM uom) {
		this.uom = uom;
	}



}
