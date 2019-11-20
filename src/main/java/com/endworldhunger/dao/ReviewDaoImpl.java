package com.endworldhunger.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.endworldhunger.model.ProviderReview;
import com.endworldhunger.model.UserReview;

@Repository
@SuppressWarnings("unchecked")
public class ReviewDaoImpl implements ReviewDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public void setSessionFactor(SessionFactory sf) {
		this.sessionFactory = sf;
	}
	
	@Override
	public List<ProviderReview> getAllReviewsForUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProviderReview> reviews = (List<ProviderReview>) session.createQuery(
				"from ProviderReview " +
				"where ownerId = :userId ")
				.setParameter("userId", id)
				.getResultList();
		
		return reviews;
	}
	
	@Override
	public List<UserReview> getAllReviewsByUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserReview> reviews = (List<UserReview>) session.createQuery(
				"from UserReview "
				+ "where authorId = :userId ")
				.setParameter("userId", id)
				.getResultList();
		
		return reviews;
	}

	@Override
	public ProviderReview addReviewForUser(ProviderReview providerReview) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(providerReview);
		return providerReview;
	}

	@Override
	public List<UserReview> getAllReviewsForProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<UserReview> reviews = (List<UserReview>) session.createQuery(
				"from UserReview " +
				"where ownerId = :providerId ")
				.setParameter("providerId", id)
				.getResultList();
		
		return reviews;
	}
	
	@Override
	public List<ProviderReview> getAllReviewsByProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		List<ProviderReview> reviews = (List<ProviderReview>) session.createQuery(
				"from ProviderReview " +
				"where authorId = :providerId ")
				.setParameter("providerId", id)
				.getResultList();
		
		return reviews;
	}

	@Override
	public UserReview addReviewForProvider(UserReview userReview) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(userReview);
		return userReview;
	}

	@Override
	public double getAverageForUser(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		System.out.println("USER AVG");
		double average = (double) session.createQuery(
				"select avg(rating) " +
				"from UserReview " +
				"where owner.id = :userId ")
				.setParameter("userId", id)
				.getSingleResult();
		
		return average;
	}

	@Override
	public double getAverageForProvider(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		System.out.println("PROVIDER AVG");
		double average = (double) session.createQuery(
				"select avg(rating) " +
				"from ProviderReview " +
				"where ownerId = :providerId ")
				.setParameter("providerId", id)
				.getSingleResult();
		
		return average;
	}
}
