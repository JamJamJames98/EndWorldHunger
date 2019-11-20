package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endworldhunger.dao.FoodItemDao;
import com.endworldhunger.model.FoodItem;

@Service("foodItemService")
public class FoodItemService {
	
	@Autowired
	FoodItemDao foodItemDao;
	
	@Transactional
	public FoodItem addFoodItem(FoodItem foodItem) {
		return foodItemDao.addFoodItem(foodItem);
	}
	
	@Transactional
	public List<FoodItem> getAllFoodItem() {
		return foodItemDao.getAllFoodItem();
	}
	
	@Transactional
	public FoodItem getFoodItem(int id) {
		return foodItemDao.getFoodItem(id);
	}
	
	@Transactional
	public int updateFoodItemQuantity(int id, int quantityTaken) {
		return foodItemDao.updateFoodItemQuantity(id, quantityTaken);
	}
	
	@Transactional
	public Boolean deleteFoodItem(int id) {
		return foodItemDao.deleteFoodItem(id);
	}
}
