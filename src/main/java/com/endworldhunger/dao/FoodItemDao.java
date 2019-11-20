package com.endworldhunger.dao;

import java.util.Date;
import java.util.List;

import com.endworldhunger.model.FoodItem;

public interface FoodItemDao {
	
	public FoodItem addFoodItem(FoodItem foodItem);
	
	public List<FoodItem> getAllFoodItem();
		
	public FoodItem getFoodItem(int id);
	
	public int updateFoodItemQuantity(int id, int quantityTaken);
	
	public Boolean deleteFoodItem(int id);
	
	public String getMostRecentListing(int providerId, Date currentDate);

	public int getFoodQuantity(int providerId, Date currentDate);
	
	public List<FoodItem> getAvailableFood(int providerId, String searchString, Date currentDate);
	
	public void cleanup(Date currentDate);
}

