package com.endworldhunger.dao;

import java.util.List;
import com.endworldhunger.model.Provider;
import com.endworldhunger.model.FoodItem;


public interface ProviderDao {
	public List<Provider> getAllProviders();
	
	public Provider getProvider(int id);
	
	public Provider addProvider(Provider provider);
	
	public Provider updateProvider(Provider provider);
	
	public Boolean deleteProvider(int id);
	
	public List<FoodItem> getFoodItemByProviderId(int id);
	
	public List<Provider> getStreakLeaderboard();
	
	public List<Provider> getPointsLeaderboard();
	
	public List<Object[]> getProviderData(String searchString, String longitude, String latitude, Double maxDistance);
	
	public List<Object[]> getAllEligibleProviderData(String longitude, String latitude, Double maxDistance);
	
	public void clearAllPoints();

}
