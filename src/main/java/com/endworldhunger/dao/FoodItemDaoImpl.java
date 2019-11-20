package com.endworldhunger.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.FoodItem;

@Repository
@SuppressWarnings({"unchecked", "deprecation"})
public class FoodItemDaoImpl implements FoodItemDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}

	@Override
	public FoodItem addFoodItem(FoodItem foodItem) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(foodItem);
		return foodItem;
	}

	@Override
	public List<FoodItem> getAllFoodItem() {
		Session session = this.sessionFactory.getCurrentSession();
		List<FoodItem> foodItems = (List<FoodItem>) session.createQuery("from FoodItem").list();
		return foodItems;
	}

	@Override
	public FoodItem getFoodItem(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		FoodItem foodItem = session.get(FoodItem.class, id);
		return foodItem;
	}

	@Override
	public int updateFoodItemQuantity(int id, int quantityTaken) {
		Session session = this.sessionFactory.getCurrentSession();
		FoodItem foodItem = session.get(FoodItem.class, id);
		int quantityAvailable = foodItem.getQuantity();
		
		/*if (quantityAvailable < quantityTaken) {
			return -1;
		}*/
		
		int updates = session.createQuery(
				"update FoodItem "+
				"set quantity = quantity - :quantityTaken " +
				"where id = :foodItemId ")
				.setParameter("quantityTaken", quantityTaken)
				.setParameter("foodItemId", id)
				.executeUpdate();
		return updates;
	}

	@Override
	public Boolean deleteFoodItem(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		FoodItem f = session.load(FoodItem.class, new Integer(id));
		if (null != f) {
			session.delete(f);
			return true;
		}
		
		return false;
	}
	
	@Override
	public int getFoodQuantity(int providerId, Date currentDate) {
		Session session = this.sessionFactory.getCurrentSession();
		List<Object> quantity = session.createQuery(
				"select SUM(quantity)" +
				" from FoodItem" +
				" where providerId = :providerId" +
				" and :currentDate < expiry")
				.setParameter("providerId", providerId)
				.setParameter("currentDate", currentDate)
				.getResultList();
		if (quantity.get(0) == null) {
			return 0;
		} else {
			return Integer.parseInt(quantity.get(0).toString());
		}
	}
	
	@Override
	public String getMostRecentListing(int providerId, Date currentDate) {
		Session session = this.sessionFactory.getCurrentSession();
		List<Object> quantity = session.createQuery(
				"select MAX(timePosted)" +
				" from FoodItem" +
				" where providerId = :providerId" +
				" and :currentDate < expiry")
				.setParameter("providerId", providerId)
				.setParameter("currentDate", currentDate)
				.getResultList();
		if (quantity.get(0) == null) {
			return "";
		} else {
			return quantity.get(0).toString();
		}
	}
	
	@Override
	public List<FoodItem> getAvailableFood(int providerId, String searchString, Date currentDate){
		Session session = this.sessionFactory.getCurrentSession();
		List<FoodItem> quantity = session.createQuery(
				"select f" +
				" from FoodItem f" +
				" where f.name LIKE :searchString" +
				" and f.quantity > 0" +
				" and :currentDate < expiry" +
				" and providerId = :providerId" +
				" order by f.name")
				.setParameter("providerId", providerId)
				.setParameter("currentDate", currentDate)
				.setParameter("searchString", "%" + searchString + "%")
				.getResultList();
		return quantity;
		
	}
	
	@Override
	public void cleanup(Date currentDate) {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery(
				"DELETE FROM FoodItem" + 
				" WHERE quantity <= 0")
				.executeUpdate();
		session.createQuery(
				"DELETE FROM FoodItem" +
				" WHERE :currentDate > expiry")
				.setParameter("currentDate", currentDate)
				.executeUpdate();
	}
}
