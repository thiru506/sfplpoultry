package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.AssetCategoriesDAO;
import com.capex.entity.AssetCategoriesMaster;

@Service
@Transactional
public class AssetCategoriesService {

	@Autowired
	private AssetCategoriesDAO assetCategoriesDAO;
	
	@Autowired
	private UserService userService;
	
	public List<AssetCategoriesMaster> getAssetCategories() {
 		return assetCategoriesDAO.getAssetCategories();
	}
 
	public void addAssetCategories(AssetCategoriesMaster assetCategories, int token) {
		 assetCategoriesDAO.addAssetCategories(assetCategories);
	}

	public void updateAssetCategories(AssetCategoriesMaster assetCategories, int token) {
		assetCategoriesDAO.updateAssetCategories(assetCategories);
	}

	public boolean deleteAssetCategories(String token, int id) {
		return assetCategoriesDAO.deleteAssetCategories(id);
	}

	public AssetCategoriesMaster getAssetCategories(int id) {
 		return assetCategoriesDAO.getAssetCategories(id);
	}


}
