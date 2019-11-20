package com.endworldhunger.service;

import java.util.List;

import javax.transaction.Transactional;

import com.endworldhunger.dao.ReportDao;
import com.endworldhunger.model.ProviderReport;
import com.endworldhunger.model.UserReport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 

@Service("reportService")
public class ReportService {
	
	@Autowired
	ReportDao reportDao;
	
	@Transactional
	public UserReport getUserReport(int id) {
		return reportDao.getUserReport(id);
	}
	
	@Transactional
	public ProviderReport getProviderReport(int id) {
		return reportDao.getProviderReport(id);
	}
	
	@Transactional
	public List<UserReport> getAllUserReport(){
		return reportDao.getAllUserReport();
	}
	
	@Transactional
	public List<ProviderReport> getAllProviderReport(){
		return reportDao.getAllProviderReport();
	}
	
	@Transactional
	public ProviderReport addProviderReport(ProviderReport providerReport) {
		return reportDao.addProviderReport(providerReport);
	}
	
	@Transactional
	public UserReport addUserReport(UserReport userReport) {
		return reportDao.addUserReport(userReport);
	}
	
	@Transactional
	public Boolean deleteUserReport(int id) {
		return reportDao.deleteUserReport(id);
	}
	
	@Transactional
	public Boolean deleteProviderReport(int id) {
		return reportDao.deleteProviderReport(id);
	}
	
	@Transactional
	public void deleteAllReportsOfUser(int id) {
		reportDao.deleteAllReportsOfUser(id);
	}
	
	@Transactional
	public void deleteAllReportsOfProvider(int id) {
		reportDao.deleteAllReportsOfProvider(id);
	}

}
