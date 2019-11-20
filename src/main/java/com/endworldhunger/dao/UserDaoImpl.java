package com.endworldhunger.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.FoodItem;
import com.endworldhunger.model.User;
import com.endworldhunger.dao.UserDao;
 
@Repository
@SuppressWarnings("unchecked")
public class UserDaoImpl implements UserDao {
 
	@Autowired
	private SessionFactory sessionFactory;
 
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}
 
	public List<User> getAllUsers() {
		Session session = this.sessionFactory.getCurrentSession();
		List<User> userList = (List<User>) session.createQuery("from User").list();
		return userList;
	}
 
	public User getUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		User user = session.get(User.class, id);
		return user;
	}
 
	public User addUser(User user) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(user);
		return user;
	}
 
	public User updateUser(User user) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(user);
		return user;
	}
 
	public Boolean deleteUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		User p = session.load(User.class, new Integer(id));
		if (null != p) {
			session.delete(p);
			return true;
		}
		
		return false;
	} 
	
	public int updateDailyLimit(int id, int amountToDecrement) {
		Session session = this.sessionFactory.getCurrentSession();
		User p = session.load(User.class, new Integer(id));
		
		int quantityAvailable = p.getDailyLimit();
		
		/*if (quantityAvailable < amountToDecrement) {
			return -1;
		}*/
		
		int updates = session.createQuery(
				"update User "+
				"set dailyLimit = dailyLimit - :amountToDecrement " +
				"where id = :userId ")
				.setParameter("amountToDecrement", amountToDecrement)
				.setParameter("userId", id)
				.executeUpdate();
		return updates;
	}
	
	public void resetDailyLimit() {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery(
				"UPDATE User" + 
				" SET dailyLimit = 4" +
				" WHERE consumerType = 'Individual'")
				.executeUpdate();
		session.createQuery(
				"UPDATE User" + 
				" SET dailyLimit = 50" +
				" WHERE consumerType = 'Charity'")
				.executeUpdate();
		session.createQuery(
				"UPDATE User" + 
				" SET dailyLimit = 50" +
				" WHERE consumerType = 'Organisation'")
				.executeUpdate();
	}
}