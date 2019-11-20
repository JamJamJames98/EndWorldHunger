package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.UserDao;
import com.endworldhunger.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
 
@Service("userService")
public class UserService {
 
	@Autowired
	UserDao userDao;
 
	@Transactional
	public List<User> getAllUsers() {
		return userDao.getAllUsers();
	}
 
	@Transactional
	public User getUser(int id) {
		return userDao.getUser(id);
	}
 
	@Transactional
	public User addUser(User user) {
		user.setRating(-1);
		if (user.getConsumerType().equals("Individual")) {
			user.setDailyLimit(4);
		} else if (user.getConsumerType().equals("Charity")) {
			user.setDailyLimit(50);
		} else if (user.getConsumerType().equals("Organisation")) {
			user.setDailyLimit(50);
		} else {
			user.setDailyLimit(0);
		}
		return userDao.addUser(user);
	}
 
	@Transactional
	public User updateUser(User user) {
		return userDao.updateUser(user);
 
	}
 
	@Transactional
	public Boolean deleteUser(int id) {
		return userDao.deleteUser(id);
	}
	
	@Transactional
	public int updateDailyLimit(int id, int amount) {
		return userDao.updateDailyLimit(id, amount);
	}
}
