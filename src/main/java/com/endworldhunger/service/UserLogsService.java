package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.LogDao;
import com.endworldhunger.model.UserLogs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 

@Service("userLogsService")
public class UserLogsService {

	@Autowired
	LogDao logDao;
	
	@Transactional
	public List<UserLogs> getAllLogsByProviderId(int id){
		return logDao.getAllLogsByProviderId(id);
	}
	
	@Transactional
	public List<UserLogs> getAllLogsByUserId(int id) {
		return logDao.getAllLogsByUserId(id);
	}
	
	@Transactional
	public UserLogs addUserLogs(UserLogs userLogs) {
		return logDao.addUserLogs(userLogs);
	}
}
