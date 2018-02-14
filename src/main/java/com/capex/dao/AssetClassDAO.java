package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.AssetClassMaster;

@Repository
@SuppressWarnings("unchecked")
public class AssetClassDAO extends BaseDAO{
	
	public List<AssetClassMaster> getAssetClass() {
		Criteria criteria=getSession().createCriteria(AssetClassMaster.class);
		return criteria.list();	}
	
	public void addAssetClass(AssetClassMaster assetClass) {
  		save(assetClass);
	}

	public void  updateAssetClass(AssetClassMaster assetClass) {
		update(assetClass);
	}

	public boolean deleteAssetClass(int id) {
		AssetClassMaster assetClass=(AssetClassMaster) getSession().get(AssetClassMaster.class, id);;
		delete(assetClass);
 		return false;
	}
	
	public AssetClassMaster getAssetClass(int id) {
		return (AssetClassMaster) getSession().get(AssetClassMaster.class, id);
	}



}
