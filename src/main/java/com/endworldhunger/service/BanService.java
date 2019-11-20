package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.BanDao;
import com.endworldhunger.model.ProviderBan;
import com.endworldhunger.model.UserBan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 

@Service("banService")
public class BanService {
	
	@Autowired
	BanDao banDao;
	
	@Transactional
	public UserBan getUserBan(int id) {
		return banDao.getUserBan(id);
	}
	
	@Transactional
	public ProviderBan getProviderBan(int id) {
		return banDao.getProviderBan(id);
	}
	
	@Transactional
	public List<UserBan> getAllUserBan() {
		return banDao.getAllUserBan();
	}
	
	@Transactional
	public List<ProviderBan> getAllProviderBan() {
		return banDao.getAllProviderBan();
	}
	
	@Transactional
	public UserBan addUserBan(UserBan userBan) {
		return banDao.addUserBan(userBan);
	}
	
	@Transactional
	public ProviderBan addProviderBan(ProviderBan providerBan) {
		return banDao.addProviderBan(providerBan);
	}
	
	@Transactional
	public Boolean deleteUserBan(int id) {
		return banDao.deleteUserBan(id);
	}
	
	@Transactional
	public Boolean deleteProviderBan(int id) {
		return banDao.deleteProviderBan(id);
	}
	
	@Transactional
	public List<UserBan> getAllBanOfUser(int id) {
		return banDao.getAllBanOfUser(id);
	}
	
	@Transactional
	public List<ProviderBan> getAllBanOfProvider(int id) {
		return banDao.getAllBanOfProvider(id);
	}
}
