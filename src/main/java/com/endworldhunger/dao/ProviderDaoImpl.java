package com.endworldhunger.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.FoodItem;
import com.endworldhunger.model.Provider;

@Repository
@SuppressWarnings({"unchecked", "deprecation"})
public class ProviderDaoImpl implements ProviderDao{
	
	
	@Autowired
	private SessionFactory sessionFactory;
 
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}
	
	@Override
	public List<Provider> getAllProviders() {
		Session session = this.sessionFactory.getCurrentSession();
		List<Provider> providerList = (List<Provider>) session.createQuery("from Provider").list();
		return providerList;
	}

	@Override
	public Provider getProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Provider provider = session.get(Provider.class, id);
		return provider;
	}

	@Override
	public Provider addProvider(Provider provider) {
		Session session = this.sessionFactory.getCurrentSession();
		provider.setRating(-1);
		session.save(provider);
		return provider;
	}

	@Override
	@Transactional
	public Provider updateProvider(Provider provider) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(provider);
		return provider;
	}

	@Override
	public Boolean deleteProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		Provider p = session.load(Provider.class, new Integer(id));
		if (null != p) {
			session.delete(p);
			return true;
		}
		
		return false;
	}

	@Override
	public List<FoodItem> getFoodItemByProviderId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<FoodItem> foodItems = (List<FoodItem>) session.createQuery(
				"from FoodItem " +
				"where provider.id = :id ")
				.setParameter( "id", id)
				.getResultList();
		return foodItems;
	}

	@Override
	public List<Provider> getStreakLeaderboard() {
		//int limit = 50; // top 50 by default
		Session session = this.sessionFactory.getCurrentSession();
		List<Provider> streakLeaderboard = (List<Provider>) session.createQuery(
				"from Provider p " +
				"order by p.streak DESC")
				.setMaxResults(50)
				.getResultList();
		
		return streakLeaderboard;
	}
	
	@Override
	public List<Provider> getPointsLeaderboard() {
		//int limit = 50; // top 50 by default
		Session session = this.sessionFactory.getCurrentSession();
		List<Provider> pointsLeaderboard = (List<Provider>) session.createQuery(
				"from Provider p " +
				"order by p.points DESC")
				.setMaxResults(50)
				.getResultList();
		
		return pointsLeaderboard;
	}
	
	@Override
	public List<Object[]> getProviderData(String searchString, String longitude, String latitude, Double maxDistance) {
		Session session = this.sessionFactory.getCurrentSession();
		List<Object[]> providerList = (List<Object[]>) session.createQuery(
			"select" +
				" (111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(:latitude)) * COS(RADIANS(p.latitude)) * COS(RADIANS(:longitude - p.longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(p.latitude)))))) as distance," +
				" p.id," +
				" p.providerName," +
				" p.location," +
				" p.providerType" +
			" from Provider p" +
			" where p.providerName like :searchString" +
			" and (111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(:latitude)) * COS(RADIANS(p.latitude)) * COS(RADIANS(:longitude - p.longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(p.latitude)))))) <= :maxDistance" +
			" order by col_0_0_ ASC")
			.setParameter("searchString", "%" + searchString + "%")
			.setParameter("longitude", Double.parseDouble(longitude))
			.setParameter("latitude", Double.parseDouble(latitude))
			.setParameter("maxDistance", maxDistance)
			.getResultList();
		return providerList;
	}
	
	@Override
	public List<Object[]> getAllEligibleProviderData(String longitude, String latitude, Double maxDistance) {
		Session session = this.sessionFactory.getCurrentSession();
		List<Object[]> providerList = (List<Object[]>) session.createQuery(
			"select" +
				" (111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(:latitude)) * COS(RADIANS(p.latitude)) * COS(RADIANS(:longitude - p.longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(p.latitude)))))) as distance," +
				" p.id," +
				" p.providerName," +
				" p.location," +
				" p.providerType" +
			" from Provider p" +
			" where (111.111 * DEGREES(ACOS(LEAST(1.0, COS(RADIANS(:latitude)) * COS(RADIANS(p.latitude)) * COS(RADIANS(:longitude - p.longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(p.latitude)))))) <= :maxDistance" +
			" order by col_0_0_ ASC")
			.setParameter("longitude", Double.parseDouble(longitude))
			.setParameter("latitude", Double.parseDouble(latitude))
			.setParameter("maxDistance", maxDistance)
			.getResultList();
		return providerList;
	}
	
	@Override
	public void clearAllPoints() {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery(
				"UPDATE Provider" + 
				" SET points = 0")
				.executeUpdate();
		}

}
