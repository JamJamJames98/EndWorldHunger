package com.endworldhunger.dao;

import java.util.List;

import com.endworldhunger.model.UserReport;
import com.endworldhunger.model.ProviderReport;


public interface ReportDao {
	
	public UserReport getUserReport(int id);
	
	public ProviderReport getProviderReport(int id);
	
	public List<UserReport> getAllUserReport();
	
	public List<ProviderReport> getAllProviderReport();
	
	public ProviderReport addProviderReport(ProviderReport providerReport);
	
	public UserReport addUserReport(UserReport userReport);
	
	public Boolean deleteUserReport(int id);
	
	public Boolean deleteProviderReport(int id);

	public void deleteAllReportsOfUser(int id);
	
	public void deleteAllReportsOfProvider(int id);
}
