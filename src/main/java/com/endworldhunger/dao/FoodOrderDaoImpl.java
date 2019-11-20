package com.endworldhunger.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.FoodOrder;


@Repository
public class FoodOrderDaoImpl implements FoodOrderDao{
	
	@Autowired
	private SessionFactory sessionFactory;
 
	public void setSessionFactory(SessionFactory sf) {
		this.sessionFactory = sf;
	}
	

	@Override
	public FoodOrder getFoodOrder(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		FoodOrder foodOrder = session.get(FoodOrder.class, id);
		return foodOrder;
	}

	@Override
	public FoodOrder addFoodOrder(FoodOrder foodOrder) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(foodOrder);
		return foodOrder;
	}

	@Override
	public int updateFoodOrderStatus(int id, String status) {
		Session session = this.sessionFactory.getCurrentSession();
		int updates = session.createQuery(
				"update FoodOrder " +
				"set orderStatus = :newOrderStatus " +
				"where id = :foodOrderId ")
				.setParameter( "newOrderStatus", status)
				.setParameter( "foodOrderId", id)
				.executeUpdate();
		return updates;
	}

	@Override
	public List<FoodOrder> getFoodOrderByProviderId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<FoodOrder> foodOrders = (List<FoodOrder>) session.createQuery(
				"from FoodOrder " +
				"where providerId.id like :id ")
				.setParameter( "id", id)
				.getResultList();
		return foodOrders;
	}


	@Override
	public List<FoodOrder> getFoodOrderByUserId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<FoodOrder> foodOrders = (List<FoodOrder>) session.createQuery(
				"from FoodOrder " +
				"where userId.id = :id ")
				.setParameter( "id", id)
				.getResultList();
		return foodOrders;
	}
	
	@Override
	public void cleanup(Date currentDate) {
		Session session = this.sessionFactory.getCurrentSession();
		session.createQuery(
				"DELETE FROM FoodOrder" + 
				" WHERE quantity <= 0")
				.executeUpdate();
		session.createQuery(
				"DELETE FROM FoodOrder" +
				" WHERE :currentDate > orderTime")
				.setParameter("currentDate", currentDate)
				.executeUpdate();
	}


	
}
