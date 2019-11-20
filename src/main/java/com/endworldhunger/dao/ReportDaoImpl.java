package com.endworldhunger.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.ProviderReport;
import com.endworldhunger.model.User;
import com.endworldhunger.model.UserReport;

@Repository
public class ReportDaoImpl implements ReportDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}

	@Override
	public UserReport getUserReport(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		UserReport userReport = session.get(UserReport.class, id);
		return userReport;
	}

	@Override
	public ProviderReport getProviderReport(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProviderReport providerReport = session.get(ProviderReport.class, id);
		return providerReport;
	}

	@Override
	public List<UserReport> getAllUserReport() {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserReport> userReportList = (List<UserReport>) session.createQuery(
				"from UserReport ")
				.getResultList();
		return userReportList;
	}

	@Override
	public List<ProviderReport> getAllProviderReport() {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProviderReport> providerReportList = (List<ProviderReport>) session.createQuery(
				"from ProviderReport ")
				.getResultList();
		return providerReportList;
	}

	@Override
	public ProviderReport addProviderReport(ProviderReport providerReport) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(providerReport);
		return providerReport;
	}

	@Override
	public UserReport addUserReport(UserReport userReport) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(userReport);
		return userReport;
	}

	@Override
	public Boolean deleteUserReport(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		UserReport userReport = session.load(UserReport.class, new Integer(id));
		if(null != userReport) {			
			session.delete(userReport);
			return true;
		}
		return false;
	}

	@Override
	public Boolean deleteProviderReport(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		ProviderReport userReport = session.load(ProviderReport.class, new Integer(id));
		if(null != userReport) {
			session.delete(userReport);
			return true;
		}
		return false;
	}

	@Override
	public void deleteAllReportsOfUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery("delete from UserReport where userId.id = :userId")
			.setParameter("userId", id)
			.executeUpdate();
	}

	@Override
	public void deleteAllReportsOfProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery("delete from ProviderReport where providerId.id = :providerId")
			.setParameter("providerId", id)
			.executeUpdate();
	}
}
