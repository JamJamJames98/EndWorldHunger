package com.endworldhunger.dao;

import java.util.List;

import com.endworldhunger.model.UserBan;
import com.endworldhunger.model.ProviderBan;

public interface BanDao {
	public UserBan getUserBan(int id);
	

	public ProviderBan getProviderBan(int id);
	
	public List<UserBan> getAllUserBan();
	
	public List<UserBan> getAllBanOfUser(int id);
	
	public List<ProviderBan> getAllProviderBan();
	
	public List<ProviderBan> getAllBanOfProvider(int id);
	
	public UserBan addUserBan(UserBan userBan);
	
	public ProviderBan addProviderBan(ProviderBan providerBan);
	
	public Boolean deleteUserBan(int id);
	
	public Boolean deleteProviderBan(int id);
}
