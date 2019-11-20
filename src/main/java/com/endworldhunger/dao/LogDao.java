package com.endworldhunger.dao;


import java.util.List;

import com.endworldhunger.model.UserLogs;

public interface LogDao {
	
	public List<UserLogs> getAllLogsByProviderId(int id);
	
	public List<UserLogs> getAllLogsByUserId(int id);
	
	public UserLogs addUserLogs(UserLogs userLogs);
	
}
