package com.endworldhunger.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.endworldhunger.dao.ReviewDao;
import com.endworldhunger.dao.ProviderDao;
import com.endworldhunger.dao.UserDao;
import com.endworldhunger.dao.FoodItemDao;
import com.endworldhunger.dao.FoodOrderDao;

@Service("scheduledTasksService")
public class ScheduledTasksService {
	
	@Autowired
	ReviewDao reviewDao;
	
	@Autowired
	ProviderDao providerDao;
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	FoodItemDao foodItemDao;
	
	@Autowired
	FoodOrderDao foodOrderDao;
	
	@Transactional
	public void resetMonthlyLeaderboard() {
		providerDao.clearAllPoints();
	}
	
	@Transactional
	public void resetDailyLimit() {
		userDao.resetDailyLimit();
	}
	
	@Transactional
	public void cleanupFoodItems() {
		foodItemDao.cleanup(calculateCurrentDate());
	}
	
	@Transactional
	public void cleanupFoodOrders() {
		foodOrderDao.cleanup(calculateCurrentDate());
	}
	
	
	private Date calculateCurrentDate() {
		Date date = new Date();
		try {
			date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").format(new Date()));
		} catch (ParseException e) {
			System.out.println("Failed to parse current date");
			e.printStackTrace();
		}
		return date;
	}
	
	
}
