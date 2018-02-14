package com.capex.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.capex.entity.AssetCategoriesMaster;

@Repository
@SuppressWarnings("unchecked")
public class AssetCategoriesDAO extends BaseDAO{
	
	public List<AssetCategoriesMaster> getAssetCategories() {
		Criteria criteria=getSession().createCriteria(AssetCategoriesMaster.class);
		return criteria.list();	}
	
	public void addAssetCategories(AssetCategoriesMaster assetCategories) {
  		save(assetCategories);
	}

	public void  updateAssetCategories(AssetCategoriesMaster assetCategories) {
		update(assetCategories);
	}

	public boolean deleteAssetCategories(int id) {
		AssetCategoriesMaster assetCategories=(AssetCategoriesMaster) getSession().get(AssetCategoriesMaster.class, id);;
		delete(assetCategories);
 		return false;
	}
	
	public AssetCategoriesMaster getAssetCategories(int id) {
		return (AssetCategoriesMaster) getSession().get(AssetCategoriesMaster.class, id);
	}



}
