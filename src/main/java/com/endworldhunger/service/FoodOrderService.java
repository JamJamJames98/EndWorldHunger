package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.FoodOrderDao;
import com.endworldhunger.model.FoodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 

@Service("foodOrderService")
public class FoodOrderService {
	
	@Autowired
	FoodOrderDao foodOrderDao;
	
	@Transactional
	public FoodOrder getFoodOrder(int id) {
		return foodOrderDao.getFoodOrder(id);
	}
	
	@Transactional
	public FoodOrder addFoodOrder(FoodOrder foodOrder) {		
		return foodOrderDao.addFoodOrder(foodOrder);
	}
	
	@Transactional
	public int updateFoodOrderStatus(int id, String status) {
		return foodOrderDao.updateFoodOrderStatus(id, status);
	}
	
	@Transactional
	public List<FoodOrder> getFoodOrderByProviderId(int id) {
		return foodOrderDao.getFoodOrderByProviderId(id);
	}
	
	@Transactional
	public List<FoodOrder> getFoodOrderByUserId(int id) {
		return foodOrderDao.getFoodOrderByUserId(id);
	}
}
