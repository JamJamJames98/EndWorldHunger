package com.endworldhunger.dao;

import java.util.Date;
import java.util.List;

import com.endworldhunger.model.FoodOrder;

public interface FoodOrderDao {
	public FoodOrder getFoodOrder(int id);
	
	public FoodOrder addFoodOrder(FoodOrder foodOrder);
	
	public int updateFoodOrderStatus(int id, String status);
		
	public List<FoodOrder> getFoodOrderByProviderId(int id);
	
	public List<FoodOrder> getFoodOrderByUserId(int id);
	
	public void cleanup(Date currentDate);
}
