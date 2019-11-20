package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endworldhunger.model.Provider;
import com.endworldhunger.model.FoodItem;

import com.endworldhunger.dao.ProviderDao;

@Service("providerService")
public class ProviderService {
	
	@Autowired
	ProviderDao providerDao;

	@Transactional
	public List<Provider> getAllProviders() {
		return providerDao.getAllProviders();
	}
	
	@Transactional
	public Provider getProvider(int id) {
		return providerDao.getProvider(id);
	}
	
	@Transactional
	public Provider addProvider(Provider provider) {
		return providerDao.addProvider(provider);
	}
	
	@Transactional
	public Provider updateProvider(Provider provider) {
		return providerDao.updateProvider(provider);
	}
	
	@Transactional
	public Boolean deleteProvider(int id) {
		return providerDao.deleteProvider(id);
	}
	
	@Transactional
	public List<FoodItem> getFoodItemsByProviderId(int id) {
		return providerDao.getFoodItemByProviderId(id);
	}
	
	@Transactional
	public List<Provider> getStreakLeaderboard() {
		return providerDao.getStreakLeaderboard();
	}
	
	@Transactional
	public List<Provider> getPointsLeaderboard() {
		return providerDao.getPointsLeaderboard();
	}
}
