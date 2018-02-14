package com.capex.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capex.dao.AssetClassDAO;
import com.capex.entity.AssetClassMaster;

@Service
@Transactional
public class AssetClassService {

	@Autowired
	private AssetClassDAO assetClassDAO;
	
	@Autowired
	private UserService userService;
	
	public List<AssetClassMaster> getAssetClass() {
 		return assetClassDAO.getAssetClass();
	}
 
	public void addAssetClass(AssetClassMaster assetClass, int token) {
		 assetClassDAO.addAssetClass(assetClass);
	}

	public void updateAssetClass(AssetClassMaster assetClass, int token) {
		assetClassDAO.updateAssetClass(assetClass);
	}

	public boolean deleteAssetClass(String token, int id) {
		return assetClassDAO.deleteAssetClass(id);
	}

	public AssetClassMaster getAssetClass(int id) {
 		return assetClassDAO.getAssetClass(id);
	}

}
