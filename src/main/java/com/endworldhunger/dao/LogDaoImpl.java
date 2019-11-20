package com.endworldhunger.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.FoodOrder;
import com.endworldhunger.model.UserLogs;

@Repository
public class LogDaoImpl implements LogDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}
	
	@Override
	public List<UserLogs> getAllLogsByUserId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserLogs> userLogs = (List<UserLogs>) session.createQuery(
				"from UserLogs " +
				"where user.id = :id ")
				.setParameter( "id", id)
				.getResultList();
		return userLogs;
	}
	
	@Override
	public List<UserLogs> getAllLogsByProviderId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserLogs> userLogs = (List<UserLogs>) session.createQuery(
				"from UserLogs " +
				"where provider.id like :id ")
				.setParameter( "id", id)
				.getResultList();
		return userLogs;
	}
	
	@Override
	public UserLogs addUserLogs(UserLogs userLogs) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(userLogs);
		return userLogs;
	}


}
