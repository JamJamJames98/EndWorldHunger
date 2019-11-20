package com.endworldhunger.dao;

import java.util.List;

import com.endworldhunger.model.User;

public interface UserDao {
	public List<User> getAllUsers();
	
	public User getUser(int id);
	
	public User addUser(User user);
	
	public User updateUser(User user);
	
	public Boolean deleteUser(int id);
	
	public int updateDailyLimit(int id, int amount);
	
	public void resetDailyLimit();
	
}
